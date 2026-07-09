<template>
    <Teleport to="body">
        <Transition name="dialog-fade">
            <div v-if="show" class="dialog grid grid-rows-[auto_1fr_auto] fixed bottom-4 desktop:bottom-auto desktop:top-1/2 desktop:left-1/2 desktop:-translate-y-1/2 desktop:-translate-x-1/2 z-100 shadow-default rounded-xl" :class="[ classes, backgroundColorClass, sizeClasses ]">
                <header class="grid dialog__header items-center px-2 py-2 bg-white border-b border-purple-light rounded-t-xl">
                    <span class="col-start-2 text-center font-semibold tablet:text-lg">{{ title }}</span>

                    <button class="col-start-3 p-3 ml-auto text-purple rounded-lg transition-all hover:bg-purple-200 hover:ring-purple/20 active:bg-purple/40 active:ring-purple/40" @click="close">
                        <Icon name="eva:close-outline" class="cursor-pointer" />
                    </button>
                </header>

                <div class="dialog__content relative overflow-y-scroll">
                    <slot />
                </div>

                <div v-if="$slots.footer" class="flex flex-col justify-end gap-2 px-4 py-4 border-t border-purple-light tablet:gap-4 tablet:flex-row tablet:px-6">
                    <slot name="footer" />
                </div>
            </div>
        </Transition>

        <Transition name="backdrop-fade">
            <div v-if="show" class="fixed w-full h-full top-0 left-0 bg-black/30 backdrop-blur-sm z-90" @click="close" />
        </Transition>
    </Teleport>
</template>

<script setup>
const emit = defineEmits(['close'])

const props = defineProps({
    title: String,
    show: Boolean,
    type: {
        type: String,
        default: 'full'
    },
    size: {
        type: String,
        default: 'medium'
    },
    classes: String,
    backgroundColorClass: {
        type: String,
        default: 'bg-white'
    },
});

watch(() => props.show, (newValue, oldValue) => {
    if (newValue === true) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

const close = () => {
    emit('close')
}

const sizeClasses = computed(() => {
    return {
        "small":
            "small",
        "medium":
            "medium"
    }[props.size];
});
</script>

<style>
@reference '~/assets/styles/index.css';

.dialog.small {
    width: calc(100% - 32px);
    max-height: calc(100dvh - 2rem);
    left: 1rem;

    @media screen and (min-width: 1136px) {
        @apply w-[424px] left-1/2;
    }
}

.dialog.medium {
    width: calc(100% - 32px);
    max-height: calc(100dvh - 2rem);
    left: 1rem;

    @media screen and (min-width: 1136px) {
        @apply desktop:w-[780px] left-1/2;
    }
}

.dialog__header {
    grid-template-columns: 3rem minmax(0, 1fr) 3rem;
}

.dialog__content {
    max-height: calc(100dvh - 6rem);

    @media screen and (min-width: 1136px) {
        max-height: 48rem;
    }
}

/* For Fade Modal */
.dialog-fade-enter-active,
.dialog-fade-leave-active {
    @apply transition-all ease-out duration-300 transform-gpu;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
    @apply translate-y-full opacity-0 desktop:-translate-y-1/2 desktop:scale-90;
}

/* For Backdrop */
.backdrop-fade-enter-active,
.backdrop-fade-leave-active {
    @apply transition-all ease-out duration-400 transform-gpu;
}

.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
    @apply opacity-0;
}
</style>