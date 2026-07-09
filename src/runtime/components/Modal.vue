<template>
  <Teleport to="body">
    <Transition
      appear
      name="modal-slide-bottom"
    >
      <div
        v-if="isOpen"
        class="modal fixed top-4 z-80 grid w-full grid-rows-[auto_1fr_auto] rounded-t-xl shadow-2xl desktop:right-0 desktop:top-0 desktop:rounded-l-xl desktop:rounded-tr-none"
        :class="[classes, sizeClasses, backgroundColorClass]"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <header class="modal__header grid items-center rounded-t-xl border-b border-b-purple-light bg-white px-2 py-2 desktop:rounded-tl-xl desktop:rounded-tr-none desktop:px-3">
          <Transition
            name="fade"
            mode="out-in"
          >
            <button
              v-if="showBack"
              type="button"
              class="col-start-1 mr-auto flex cursor-pointer rounded-lg p-3 text-purple transition-all duration-300 hover:bg-purple-200 hover:ring-purple/20 active:bg-purple/40 active:ring-purple/40"
              aria-label="Terug"
              @click="back"
            >
              <Icon
                name="eva:arrow-ios-back-outline"
                class="block"
              />
            </button>
          </Transition>

          <Transition
            name="fade"
            mode="out-in"
          >
            <div
              :key="title"
              class="col-start-2 text-center font-semibold tablet:text-lg"
            >
              {{ title }}
            </div>
          </Transition>

          <button
            type="button"
            class="col-start-3 ml-auto flex cursor-pointer rounded-lg p-3 text-purple transition-all duration-300 hover:bg-purple-200 hover:ring-purple/20 active:bg-purple/40 active:ring-purple/40"
            aria-label="Sluiten"
            @click="close"
          >
            <Icon
              name="eva:close-outline"
              class="block"
            />
          </button>
        </header>

        <div
          class="modal__content relative overflow-x-hidden overflow-y-scroll"
          @scroll="handleScrollTop"
        >
          <slot />
        </div>

        <div
          v-if="$slots.footer"
          class="border-t border-purple-light bg-white px-4 py-4 desktop:rounded-bl-xl desktop:px-10"
        >
          <slot name="footer" />
        </div>
      </div>
    </Transition>

    <Transition name="backdrop-fade">
      <div
        v-if="isOpen"
        class="fixed left-0 top-0 z-70 h-full w-full bg-black/30 backdrop-blur-sm"
        @click="close"
      />
    </Transition>
  </Teleport>
</template>

<script setup>
defineOptions({
  name: 'IndModal',
})

const emit = defineEmits(['back', 'close', 'scroll-top'])

const props = defineProps({
  title: String,
  show: {
    type: [Boolean, Object],
    default: false,
  },
  size: {
    type: String,
    default: 'small',
    validator: value => ['small', 'medium', 'large'].includes(value),
  },
  showBack: Boolean,
  classes: String,
  backgroundColorClass: {
    type: String,
    default: 'bg-white',
  },
})

const isOpen = computed(() => Boolean(props.show))

let previousBodyOverflow

const setBodyLocked = (locked) => {
  if (!import.meta.client) {
    return
  }

  if (locked) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return
  }

  if (previousBodyOverflow !== undefined) {
    document.body.style.overflow = previousBodyOverflow
    previousBodyOverflow = undefined
  }
}

watch(isOpen, setBodyLocked, { immediate: true })

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
  setBodyLocked(false)
})

const back = () => {
  emit('back')
}

const close = () => {
  emit('close')
}

function handleEscape(event) {
  if (event.key === 'Escape' && isOpen.value) {
    close()
  }
}

const handleScrollTop = (event) => {
  emit('scroll-top', event.target.scrollTop)
}

const sizeClasses = computed(() => {
  return {
    small: 'desktop:w-[544px]',
    medium: 'desktop:w-[968px]',
    large: 'desktop:w-[80vw] desktop:min-w-[968px] desktop:max-w-[1432px]',
  }[props.size]
})
</script>

<style>
@reference '../assets/style.css';

.modal {
  height: calc(100dvh - 1rem);
  padding-bottom: env(safe-area-inset-bottom, 50px);

  @media screen and (min-width: 1136px) {
    height: 100dvh;
  }
}

.modal__header {
  grid-template-columns: 3rem minmax(0, 1fr) 3rem;
}

.modal-slide-bottom-enter-active,
.modal-slide-bottom-leave-active {
  @apply transition-all ease-out duration-400 transform-gpu;
}

.modal-slide-bottom-enter-from,
.modal-slide-bottom-leave-to {
  @apply translate-y-full desktop:translate-y-0 desktop:translate-x-full;
}

.backdrop-fade-enter-active,
.backdrop-fade-leave-active {
  @apply transition-all ease-out duration-400 transform-gpu;
}

.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
  @apply opacity-0;
}
</style>
