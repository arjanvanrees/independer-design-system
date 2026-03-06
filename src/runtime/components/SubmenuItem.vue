<template>
    <li>
        <NuxtLink
            class="w-full flex justify-between p-3 text-purple text-left rounded hover:underline hover:text-purple-dark hover:underline-offset-4 hover:decoration-1 active:bg-purple-200 cursor-pointer transition-all"
            :class="{ 'bg-purple-200': active }" :to="to">
            <div class="flex">
                <Icon v-if="icon" :name="icon" class="mr-2" />

                {{ label }}
            </div>

            <Icon v-if="iconRight" name="eva:chevron-right-outline" class="ml-auto" />
        </NuxtLink>
    </li>
</template>

<script setup>
defineProps({
    label: String,
    icon: String,
    iconRight: {
        type: Boolean,
        default: false
    },
    active: false,
    to: String
})
</script>