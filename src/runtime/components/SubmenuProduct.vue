<template>
    <li>
        <button
            class="flex items-center justify-between w-full p-2 font-semibold text-purple rounded cursor-pointer hover:underline hover:text-purple-dark hover:underline-offset-4 hover:decoration-1 active:bg-purple-200 transition-all"
            :class="{ 'bg-purple-200': active }">
            <div class="flex items-center gap-2">
                <img :src="`/assets/${icon}`" class="h-12 w-12" />

                <span class="font-serif">{{ label }}</span>
            </div>

            <Icon name="eva:chevron-right-outline" class="ml-auto" />
        </button>
    </li>
</template>

<script setup>
defineProps({
    label: String,
    icon: String,
    active: Boolean
})
</script>