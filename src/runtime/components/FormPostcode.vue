<template>
  <div class="@container mb-6">
    <FormRow :grid="true" class="mb-0!">
      <FormInput name="postcode" label="Postcode" autocomplete="postcode" type="text"
        class="w-full col-span-2 @md:col-span-2" :label-classes="labelClasses" v-model="address.postcode" />

      <FormInput name="number" label="Huisnummer" type="number" class="w-full col-span-1" :label-classes="labelClasses"
        v-model="address.number" />
      <FormSelect name="addition" label="Toevoeging" class="w-full col-span-1" :label-classes="labelClasses"
        :options="address.additions" :selected="address.addition" v-model="address.addition"
        :disabled="selectAdditionDisabled" />
    </FormRow>

    <Collapse class="v-collapse" :when="address.address != ''">
      <div class="flex mt-2">
        <Icon name="eva:checkmark-outline" class="mr-2 text-green" />
        {{ address.address }}
      </div>
    </Collapse>

    <Collapse :when="count === 0">
      <div v-if="count === 0" class="flex mt-2 text-red">
        Het lijkt erop dat er geen huis bestaat met deze combinatie.
      </div>
    </Collapse>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Collapse } from 'vue-collapsed'

const address = useAddressStore()
const number = storeToRefs(address).number
const addition = storeToRefs(address).addition
const count = ref(null)

defineProps({
  labelClasses: {
    type: String,
    default: '',
  },
})

watch(number, () => {
  fetchAdditons()
})

watch(addition, () => {
  fetchAddress()
})

const fetchAdditons = () => {
  fetch(`https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest?q=${address.postcode}%20${address.number}&fl=huisletter,huisnummertoevoeging`)
    .then(response => response.json())
    .then(data => {
      address.additions = data.response.docs.map((item) => {
        if (item.huisletter === undefined && item.huisnummertoevoeging === undefined)
          return { label: '-', value: '-' }

        if (item.huisletter)
          return { label: item.huisletter, value: item.huisletter }

        if (item.huisnummertoevoeging)
          return { label: item.huisnummertoevoeging, value: item.huisnummertoevoeging }
      })

      count.value = data.response.numFound

      if (data.response.numFound === 1) {
        address.addition = '-'
      } else {
        address.addition = address.additions[0].value
      }

      fetchAddress()
    });
}

const constructAdressURL = () => {
  if (address.addition === '-') {
    return `https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest?q=${address.postcode}%20${address.number}&fl=straatnaam,woonplaatsnaam,weergavenaam`
  } else {
    return `https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest?q=${address.postcode}%20${address.number}-${address.addition}&fl=straatnaam,woonplaatsnaam,weergavenaam`
  }
}

const fetchAddress = () => {
  fetch(constructAdressURL())
    .then(response => response.json())
    .then(data => {
      address.address = data.response.docs[0].weergavenaam
      address.street = data.response.docs[0].straatnaam
      address.city = data.response.docs[0].woonplaatsnaam
    })
}

const selectAdditionDisabled = computed(() => {
  return address.additions.length === 0 || address.additions.length === 1
})
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