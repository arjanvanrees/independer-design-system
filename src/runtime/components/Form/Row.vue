<template>
  <div
    class=""
    :class="[margin, grid]"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'IndFormRow',
})

const props = defineProps({
  last: {
    type: Boolean,
    default: false,
  },
  grid: {
    type: Boolean,
    default: false,
  },
})

const margin = computed(() => {
  return {
    'mb-6': !props.last,
    '!mb-0': props.last,
  }
})

const grid = computed(() => {
  return {
    '': !props.grid,
    'grid grid-cols-2 gap-4 desktop:grid-cols-4 desktop:gap-6': props.grid,
  }
})
</script>
