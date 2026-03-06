<template>
    <Teleport to="body">
        <Transition appear name="modal-slide-bottom">
            <div v-if="show" class="modal grid grid-rows-[auto_1fr_auto] fixed w-full top-4 rounded-t-xl desktop:rounded-tr-none desktop:rounded-l-xl z-80 desktop:top-0 desktop:right-0 shadow-2xl" :class="[ classes, sizeClasses, backgroundColorClass ]">
                <header class="modal__header grid  items-center px-2 py-2 bg-white border-b border-b-purple-light rounded-t-xl desktop:px-3 desktop:rounded-tl-xl desktop:rounded-tr-none">
                    <Transition name="fade" mode="out-in">
                        <button v-if="showBack" class="col-start-1 flex p-3 rounded-lg cursor-pointer text-purple transition-all duration-300 mr-auto hover:bg-purple-200 hover:ring-purple/20 active:bg-purple/40 active:ring-purple/40" @click="back">
                            <Icon name="eva:arrow-ios-back-outline" class="block" />
                        </button>
                    </Transition>

                    <Transition name="fade" mode="out-in">
                        <div :key="title" class="col-start-2 text-center font-semibold tablet:text-lg">{{ title }}</div>
                    </Transition>

                    <button class="col-start-3 flex p-3 ml-auto rounded-lg cursor-pointer text-purple transition-all duration-300 hover:bg-purple-200 hover:ring-purple/20 active:bg-purple/40 active:ring-purple/40" @click="close">
                        <Icon name="eva:close-outline" class="block" />
                    </button>
                </header>

                <div class="modal__content relative overflow-y-scroll overflow-x-hidden" @scroll="handleScrollTop">
                    <slot />
                </div>

                <div v-if="$slots.footer" class="px-4 py-4 bg-white border-t border-purple-light desktop:rounded-bl-xl desktop:px-10">                   
                    <slot name="footer" />
                </div>
            </div>
        </Transition>

        <Transition name="backdrop-fade">
            <div v-if="show" class="fixed w-full h-full top-0 left-0 bg-black/30 backdrop-blur-sm z-70" @click="close" />
        </Transition>
    </Teleport>
</template>

<script setup>
const emit = defineEmits(['back', 'close', 'scroll-top'])

const props = defineProps({
    title: String,
    show: {
        type: Boolean || Object,
        default: false
    },
    type: {
        type: String,
        default: 'full'
    },
    size: {
        type: String,
        default: 'small'
    },
    showBack: Boolean,
    classes: String,
    backgroundColorClass: {
        type: String,
        default: 'bg-white'
    },
});

onMounted(() => {    
    window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)

    document.body.style.overflow = 'auto';
})

watch(() => props.show, (newValue) => {
    if (newValue === true) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

const back = () => {
    emit('back')
}

const close = () => {
    emit('close')
}

const handleEscape = (event) => {
    if (event.key === 'Escape' && props.show) {
        close()
    }
}

const handleScrollTop = (event) => {
    emit('scroll-top', event.target.scrollTop)
}

const sizeClasses = computed(() => {
    return {
        "small":
            "desktop:w-[544px]",
        "medium":
            "desktop:w-[968px]",
        "large":
            "desktop:w-[80vw] desktop:min-w-[968px] desktop:max-w-[1432px]",
    }[props.size];
});
</script>

<style>
@reference '../assets/style.css';

.modal {
    height: calc(100dvh - 1rem);
    padding-bottom: env(safe-area-inset-bottom, 50px);
    /* padding-bottom: 50px; */

    @media screen and (min-width: 1136px) {
        height: 100dvh;
    }
}

.modal__header {
    grid-template-columns: 3rem minmax(0, 1fr) 3rem;
}

/* For Slide Bottom Modal (from right) */
.modal-slide-bottom-enter-active,
.modal-slide-bottom-leave-active {
    @apply transition-all ease-out duration-400 transform-gpu;
}

.modal-slide-bottom-enter-from,
.modal-slide-bottom-leave-to {
    @apply translate-y-full desktop:translate-y-0 desktop:translate-x-full;
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