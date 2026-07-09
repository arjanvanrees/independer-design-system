<template>
  <NuxtLink
    v-if="path && !disabled"
    :to="path"
    class="inline-flex justify-center rounded-lg border font-semibold outline-none ring-purple transition-all ease-out focus-visible:border-purple focus-visible:ring-1"
    :class="[classes, loadingClasses, iconOnly]"
  >
    <slot>
      <Icon
        v-if="icon"
        :name="icon"
        class="h-6 w-6 shrink-0 cursor-pointer"
        :class="{ 'mr-2': label }"
      />

      <span :class="{ invisible: loading }">
        {{ label }}
      </span>

      <Transition
        name="fade"
        mode="in-out"
      >
        <Icon
          v-if="loading"
          name="eva:loader-outline"
          class="ml-2 h-6 w-6 shrink-0 animate-spin"
        />
      </Transition>
    </slot>
  </NuxtLink>

  <button
    v-else
    class="inline-flex cursor-pointer justify-center rounded-lg border font-semibold outline-none ring-purple transition-all ease-out focus-visible:border-purple focus-visible:ring-1"
    :class="[classes, loadingClasses, iconOnly]"
    :disabled="disabled"
  >
    <slot>
      <Icon
        v-if="icon"
        :name="icon"
        class="h-6 w-6 shrink-0 cursor-pointer"
        :class="{ 'mr-2': label }"
      />

      <span :class="{ invisible: loading }">
        {{ label }}
      </span>

      <Transition
        name="fade"
        mode="in-out"
      >
        <div
          v-if="loading"
          class="absolute"
        >
          <Icon
            name="eva:loader-outline"
            class="h-6 w-6 shrink-0 animate-spin"
          />
        </div>
      </Transition>
    </slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'IndButton',
})

const props = defineProps({
  tone: String,
  name: String,
  label: String,
  path: String,
  icon: String,
  loading: Boolean,
  disabled: Boolean,
  modal: {
    type: Boolean,
    default: false,
  },
})

const classes = computed(() => {
  return {
    'filled-yellow':
      'bg-yellow border-yellow text-yellow-1000 hover:bg-yellow-dark hover:border-yellow-dark active:bg-yellow-300 active:border-yellow-300 disabled:bg-grey-200 disabled:text-grey-500 disabled:border-grey-200 disabled:cursor-not-allowed',
    'filled-purple':
      'bg-purple border-purple text-white hover:bg-purple-dark hover:border-purple-dark active:bg-purple-800 active:border-purple-800 disabled:bg-grey-200 disabled:text-grey-500 disabled:border-grey-200 disabled:cursor-not-allowed',
    'wire-purple':
      'border-purple text-purple hover:text-purple hover:bg-purple-200 active:bg-purple/40 disabled:bg-transparent disabled:border-grey disabled:text-grey disabled:cursor-not-allowed',
    'naked-purple':
      'border-transparent text-purple hover:bg-purple-200 active:bg-purple/40',
    'wire-white':
      'bg-transparent border-white text-white hover:bg-black/10 active:bg-black/30 ring-white focus-visible:border-white disabled:bg-transparent disabled:border-grey disabled:text-grey disabled:cursor-not-allowed',
    'naked-white':
      'bg-transparent border-white text-white hover:bg-black/10 active:bg-black/30 ring-white focus-visible:border-white',
    'link':
      'justify-start px-0 bg-transparent border-transparent text-purple hover:text-purple-dark active:text-purple-900',
  }[props.tone]
})

const iconOnly = computed(() => {
  if (props.label === undefined && props.icon !== undefined) {
    return 'p-[0.6875rem]'
  }

  return 'px-3 py-[0.6875rem]'
})

const loadingClasses = computed(() => {
  if (props.loading) {
    return 'border-grey bg-grey text-grey-dark cursor-not-allowed'
  }

  return ''
})
</script>
