<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div
        v-if="isOpen"
        class="dialog fixed bottom-4 z-100 grid grid-rows-[auto_1fr_auto] rounded-xl shadow-overlay desktop:bottom-auto desktop:left-1/2 desktop:top-1/2 desktop:-translate-x-1/2 desktop:-translate-y-1/2"
        :class="[classes, backgroundColorClass, sizeClasses]"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <header class="dialog__header grid items-center rounded-t-xl border-b border-purple-light bg-white px-2 py-2">
          <span class="col-start-2 text-center font-semibold tablet:text-lg">{{ title }}</span>

          <button
            type="button"
            class="col-start-3 ml-auto rounded-lg p-3 text-purple transition-all hover:bg-purple-200 hover:ring-purple/20 active:bg-purple/40 active:ring-purple/40"
            aria-label="Sluiten"
            @click="close"
          >
            <Icon
              name="eva:close-outline"
              class="cursor-pointer"
            />
          </button>
        </header>

        <div class="dialog__content relative overflow-y-scroll">
          <slot />
        </div>

        <div
          v-if="$slots.footer"
          class="flex flex-col justify-end gap-2 border-t border-purple-light px-4 py-4 tablet:flex-row tablet:gap-4 tablet:px-6"
        >
          <slot name="footer" />
        </div>
      </div>
    </Transition>

    <Transition name="backdrop-fade">
      <div
        v-if="isOpen"
        class="fixed left-0 top-0 z-90 h-full w-full bg-black/30 backdrop-blur-sm"
        @click="close"
      />
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue'

defineOptions({
  name: 'IndDialog',
})

const emit = defineEmits(['close'])

const props = defineProps({
  title: String,
  show: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium'].includes(value),
  },
  classes: String,
  backgroundColorClass: {
    type: String,
    default: 'bg-white',
  },
})

const isOpen = computed(() => props.show)

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

const close = () => {
  emit('close')
}

function handleEscape(event) {
  if (event.key === 'Escape' && isOpen.value) {
    close()
  }
}

const sizeClasses = computed(() => {
  return {
    small: 'small',
    medium: 'medium',
  }[props.size]
})
</script>

<style>
@reference '../assets/style.css';

.dialog.small {
  width: calc(100% - 32px);
  max-height: calc(100dvh - 2rem);
  left: 1rem;

  @media screen and (min-width: 1136px) {
    @apply left-1/2 w-[424px];
  }
}

.dialog.medium {
  width: calc(100% - 32px);
  max-height: calc(100dvh - 2rem);
  left: 1rem;

  @media screen and (min-width: 1136px) {
    @apply left-1/2 desktop:w-[780px];
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

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  @apply transition-all ease-out duration-300 transform-gpu;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  @apply translate-y-full opacity-0 desktop:-translate-y-1/2 desktop:scale-90;
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
