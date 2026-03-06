<template>
    <button class="flex gap-2 font-semibold text-purple ml-auto px-3 desktop:px-6 py-3 rounded-lg cursor-pointer hover:underline hover:text-purple-dark hover:underline-offset-4 hover:decoration-1"
        :class="{ 'bg-purple-200': state }" @click.prevent="emit('toggle')">
        <slot />

        <Icon v-if="icon" name="eva:arrow-ios-downward-outline" class="!hidden desktop:!block transition-all" />
    </button>
</template>

<script setup>
const emit = defineEmits(['toggle'])

defineProps({
    state: Boolean,
    icon: {
        type: Boolean,
        default: true
    }
})
</script>