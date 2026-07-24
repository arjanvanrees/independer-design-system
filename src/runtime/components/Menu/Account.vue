<template>
  <div class="min-w-[336px] bg-white rounded-lg">
    <ul class="p-3 border-b border-grey-light">
      <IndSubmenuItem
        label="Overzicht"
        icon="eva:file-text-outline"
      />
      <IndSubmenuItem
        label="Adviezen"
        icon="eva:bell-outline"
      />
      <IndSubmenuItem
        label="Vergelijken"
        icon="eva:heart-outline"
      />
      <IndSubmenuItem
        label="Instellingen"
        icon="eva:settings-outline"
      />
      <IndSubmenuItem
        label="Schade melden"
        icon="eva:alert-triangle-outline"
      />
    </ul>

    <ul class="flex flex-col gap-3 p-3">
      <IndButton
        v-if="!user.loggedIn"
        tone="filled-yellow"
        label="Inloggen"
        class="w-full"
        @click.prevent="user.toggleDialogLogin"
      />
      <IndButton
        v-if="!user.loggedIn"
        tone="wire-purple"
        label="Nieuwe klant?"
        class="w-full"
      />
      <IndSubmenuItem
        v-if="user.loggedIn"
        label="Uitloggen"
        icon="eva:log-out-outline"
        @click.prevent="user.toggleLogin"
      />
    </ul>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    default: () => ({
      loggedIn: false,
      name: 'Arjan',
    }),
  },
})
</script>
