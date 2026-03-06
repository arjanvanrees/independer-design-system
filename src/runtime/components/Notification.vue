<template>
    <div v-if="show" class="notification flex gap-2 p-3 border rounded-lg" :class="classesBackground">
        <Icon v-if="icon" :name="icon" :class="classesIcon" />

        <div class="w-full">
            <slot />
        </div>

        <Icon v-if="closeButton" name="eva:close-outline" class="text-grey-dark cursor-pointer"
            @click.prevent="close" />
    </div>
</template>

<script setup>
const props = defineProps({
    tone: String,
    icon: String,
    closeButton: {
        type: Boolean,
        default: false
    },
});

const show = ref(true);

const classesBackground = computed(() => {
    return {
        'info': 'bg-blue-light text-blue-darkest border-blue-400',
    }[props.tone];
});

const classesIcon = computed(() => {
    return {
        'info': 'text-blue-darkest',
    }[props.tone];
});

const close = () => {
    show.value = false;
}
</script>

<style>
@reference '../assets/style.css';

.notification a {
    @apply font-semibold text-blue-darkest;
}
</style>