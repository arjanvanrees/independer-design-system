<template>
    <div class="min-w-[336px]">
      <div class="bg-white rounded-lg" :class="{ 'rounded-r-none': verzekeringen || energie }">
        <ul class="p-3">
          <ISubmenuItem label="Verzekeringen" icon="shield.svg" @click.prevent="emit('toggle-verzekeringen')" :active="verzekeringen" />
          <ISubmenuItem label="Sparen en lenen" icon="sparen.svg" />
          <ISubmenuItem label="Hypotheken" icon="hypotheek.svg" />
          <ISubmenuItem label="Energie" icon="energie.svg" @click.prevent="emit('toggle-energie')" :active="energie" />
          <ISubmenuItem label="Mobiel, internet en bellen" icon="phone.svg" />
        </ul>

        <ul class="p-3 border-t border-grey-light desktop:hidden">
          <ISubmenuItem label="Kennis & tools" :icon-right="true" @click.prevent="emit('toggle-kennis')" :active="kennis" />
          <ISubmenuItem label="Klantenservice" :icon-right="true" @click.prevent="emit('toggle-klantenservice')" :active="klantenservice" />
        </ul>
      </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['toggle-verzekeringen', 'toggle-energie', 'toggle-kennis', 'toggle-klantenservice'])

defineProps({
  verzekeringen: Boolean,
  energie: Boolean,
  kennis: Boolean,
  klantenservice: Boolean,
})
</script>