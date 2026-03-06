<template>
  <div class="mb-6">
    <FormRow :grid="true" class="mb-0!">
      <FormInput name="kenteken" label="Kenteken" leading-icon="game-icons:european-flag" type="text" class="col-span-2" v-model="auto.kenteken" />
    </FormRow>
      
    <Collapse class="v-collapse" :when="auto.merk != '' && auto.model != ''">
      <div class="flex mt-2 col-span-4">
        <Icon 
          name="eva:checkmark-outline"
          class="mr-2 text-green"
        />
        {{ auto.merk }} {{ auto.model }}
      </div>
    </Collapse>

    <Collapse :when="count === 0">
      <div v-if="count === 0" class="flex mt-2 text-red">
        Het lijkt erop dat er geen auto bestaat met dit kenteken.
      </div>
    </Collapse>
  </div>
</template>

<script setup>
import { Collapse } from 'vue-collapsed'

const address = useAddressStore()
const auto = useAutoStore()

const kenteken = storeToRefs(auto).kenteken
const count = ref(null)

watch(kenteken, (value) => {
  fetchKentekens()
})

const fetchKentekens = () => {
  var kenteken = auto.kenteken.toUpperCase().replace(/-/g, '')

  fetch(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${kenteken}`)
    .then(response => response.json())
    .then(data => {
      if (data.length === 1) {
        auto.merk = data[0].merk
        auto.model = data[0].handelsbenaming
        auto.bouwjaar = data[0].datum_eerste_toelating
        auto.kleur = data[0].eerste_kleur
      } else {
        auto.merk = ''
        auto.model = ''
        auto.bouwjaar = ''
        auto.kleur = ''
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
</script>

<!-- <style>
@reference '../assets/styles/index.css';

.validation-slide-down-enter-active,
.validation-slide-down-leave-active {
  @apply transition-all ease-out duration-500 delay-200;
}

.validation-slide-down-enter-from,
.validation-slide-down-leave-to {
  @apply opacity-0 -translate-y-full;
}
</style> -->