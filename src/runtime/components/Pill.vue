<template>
  <div
    class="flex items-center py-1 px-2 rounded-full font-sans text-xs font-semibold"
    :class="color"
  >
    {{ label }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'IndPill',
})

const props = defineProps({
  label: {
    type: String,
    default: 'Advies',
  },
  color: {
    type: String,
    default: 'secondary-subtle',
  },
})

const color = computed(() => {
  switch (props.color) {
    case 'secondary-subtle':
      return 'bg-peach-200 text-peach-900'
    case 'primary-subtle':
      return 'bg-purple-200 text-purple-dark'
    case 'blue-subtle':
      return 'bg-blue-200 text-blue-900'
    default:
      return 'bg-peach-200 text-peach-900'
  }
})
</script>
