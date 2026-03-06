<template>
    <div class="min-w-[336px] bg-white rounded-lg">
        <ul class="p-3 border-b border-grey-light">
            <ISubmenuItem label="Overzicht" icon="eva:file-text-outline" />
            <ISubmenuItem label="Adviezen" icon="eva:bell-outline" />
            <ISubmenuItem label="Vergelijken" icon="eva:heart-outline" />
            <ISubmenuItem label="Instellingen" icon="eva:settings-outline" />
            <ISubmenuItem label="Schade melden" icon="eva:alert-triangle-outline" />
        </ul>

        <ul class="flex flex-col gap-3 p-3">
            <IButton v-if="!user.loggedIn" tone="filled-yellow" label="Inloggen" class="w-full"
                @click.prevent="user.toggleDialogLogin" />
            <IButton v-if="!user.loggedIn" tone="wire-purple" label="Nieuwe klant?" class="w-full" />
            <ISubmenuItem v-if="user.loggedIn" label="Uitloggen" icon="eva:log-out-outline"
                @click.prevent="user.toggleLogin" />
        </ul>
    </div>
</template>

<script setup>
defineProps({
    user: {
        type: Object,
        required: true
    }
})
</script>