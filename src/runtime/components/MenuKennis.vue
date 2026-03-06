<template>
    <div class="min-w-[336px]">
        <div class="bg-white rounded-lg" :class="{ 'rounded-r-none': kennisbank }">
            <ul class="p-3">
                <h4 class="pt-4 px-3 pb-2 font-serif text-purple-dark font-bold desktop:hidden">Kennis & tools</h4>
                <ISubmenuItem label="Kennisbank" :icon-right="true" :active="kennisbank" @click.prevent="emit('toggle-kennisbank')" />
                <ISubmenuItem label="Slimme tools" :icon-right="true" />
                <ISubmenuItem label="Over Independer" :icon-right="true" />
            </ul>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['toggle-kennisbank'])

defineProps({
  kennisbank: Boolean,
})
</script>