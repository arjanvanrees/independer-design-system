<template>
    <details>
        <summary class="group flex pt-4 px-3 pb-2 font-serif text-purple-dark font-bold cursor-pointer" @click="toggleOpen">
            {{ label }}

            <Icon 
                v-if="!open"
                name="eva:plus-outline"
                class="ml-auto"
            />

            <Icon 
                v-if="open"
                name="eva:minus-outline"
                class="ml-auto"
            />
        </summary>

        <slot></slot>
    </details>
</template>

<script setup>
defineProps({
    label: String,
})

const open = ref(false)

const toggleOpen = () => {
    open.value = !open.value
}
</script>