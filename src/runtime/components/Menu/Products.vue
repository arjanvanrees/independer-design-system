<template>
  <div class="min-w-[336px]">
    <div
      class="bg-white rounded-lg"
      :class="{ 'rounded-r-none': verzekeringen || energie }"
    >
      <ul class="p-3">
        <IndSubmenuProduct
          label="Verzekeringen"
          :icon="shieldIcon"
          :active="verzekeringen"
          @click.prevent="emit('toggle-verzekeringen')"
        />
        <IndSubmenuProduct
          label="Sparen en lenen"
          :icon="sparenIcon"
        />
        <IndSubmenuProduct
          label="Hypotheken"
          :icon="hypotheekIcon"
        />
        <IndSubmenuProduct
          label="Energie"
          :icon="energieIcon"
          :active="energie"
          @click.prevent="emit('toggle-energie')"
        />
        <IndSubmenuProduct
          label="Mobiel, internet en bellen"
          :icon="phoneIcon"
        />
      </ul>

      <ul class="p-3 border-t border-grey-light desktop:hidden">
        <IndSubmenuItem
          label="Kennis & tools"
          :icon-right="true"
          :active="kennis"
          @click.prevent="emit('toggle-kennis')"
        />
        <IndSubmenuItem
          label="Klantenservice"
          :icon-right="true"
          :active="klantenservice"
          @click.prevent="emit('toggle-klantenservice')"
        />
      </ul>
    </div>
  </div>
</template>

<script setup>
import shieldIcon from '../../assets/images/shield.svg'
import sparenIcon from '../../assets/images/sparen.svg'
import hypotheekIcon from '../../assets/images/hypotheek.svg'
import energieIcon from '../../assets/images/energie.svg'
import phoneIcon from '../../assets/images/phone.svg'

const emit = defineEmits(['toggle-verzekeringen', 'toggle-energie', 'toggle-kennis', 'toggle-klantenservice'])

defineProps({
  verzekeringen: Boolean,
  energie: Boolean,
  kennis: Boolean,
  klantenservice: Boolean,
})
</script>
