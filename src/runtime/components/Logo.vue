<template>
  <div>
    <img
      src="../assets/images/logo-full.svg"
      :class="sizeClass + ' shrink-0 object-contain object-left'"
    >
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
  },
})

const sizeClass = computed(() => {
  if (props.size === 'small') return 'w-32 h-6'
  if (props.size === 'medium') return 'w-80 h-8'
  if (props.size === 'large') return 'w-48 h-11'
  return 'w-80 h-9'
})
</script>
