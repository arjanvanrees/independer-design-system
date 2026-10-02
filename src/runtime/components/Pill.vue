<template>
  <div
    class="inline-flex items-center justify-center rounded-full font-sans font-semibold whitespace-nowrap"
    :class="[colorClasses, sizeClasses.root]"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="shrink-0 object-contain"
      :class="sizeClasses.image"
    />
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
  size: {
    type: String,
    default: 'xs',
    validator: value => ['xs', 'sm', 'md', 'lg'].includes(value),
  },
  icon: {
    type: String,
    default: '',
  },
})

// Outline variants use an inset ring so the pill keeps the same size as the filled variants.
const colors = {
  'neutral-subtle': 'bg-neutral-subtlest text-text-default',
  'neutral-strong': 'bg-neutral-strong text-white',
  'neutral-outline': 'bg-transparent text-text-default ring-1 ring-inset ring-border-default-strong',

  'spotlight-subtle': 'bg-spotlight text-text-spotlight-strong',
  'spotlight-strong': 'bg-blue-600 text-white',
  'spotlight-outline': 'bg-transparent text-text-spotlight-strong ring-1 ring-inset ring-border-spotlight',

  'brand-primary-subtle': 'bg-brand-primary-subtler text-brand-primary-strong',
  'brand-primary': 'bg-brand-primary text-white',
  'brand-primary-strong': 'bg-brand-primary-strong text-white',
  'brand-primary-outline': 'bg-transparent text-brand-primary-strong ring-1 ring-inset ring-brand-primary',

  'positive-subtle': 'bg-green-100 text-green-900',
  'positive-strong': 'bg-green-700 text-white',
  'positive-outline': 'bg-transparent text-green-800 ring-1 ring-inset ring-green-600',

  'warning-subtle': 'bg-warning text-orange-900',
  'warning-strong': 'bg-warning-strong text-orange-1000',
  'warning-outline': 'bg-transparent text-orange-800 ring-1 ring-inset ring-orange-400',

  'negative-subtle': 'bg-red-100 text-red-900',
  'negative-strong': 'bg-red-600 text-white',
  'negative-outline': 'bg-transparent text-red-800 ring-1 ring-inset ring-red-600',

  'brand-accent-subtle': 'bg-accent-subtlest text-text-accent-inverse',
  'brand-accent': 'bg-accent text-text-accent-inverse',

  'brand-secondary-subtlest': 'bg-brand-secondary-subtlest text-text-expert-strong',
  'expert-advice': 'bg-brand-secondary-subtle text-text-expert-strong',
  'own-insurance': 'bg-brand-primary-subtlest text-brand-primary-strong',
  'disabled': 'bg-neutral-subtlest text-grey-500',

  // Legacy aliases
  'secondary-subtle': 'bg-peach-200 text-peach-900',
  'primary-subtle': 'bg-purple-200 text-purple-dark',
  'blue-subtle': 'bg-blue-200 text-blue-900',
}

// Dimensions follow the Figma base-pill sizes.
const sizes = {
  xs: { root: 'gap-1 px-2 py-1 text-xs leading-4', image: 'size-4' },
  sm: { root: 'gap-1 px-2 py-1 text-sm leading-5', image: 'size-5' },
  md: { root: 'gap-1 h-9 px-3 text-sm leading-5', image: 'size-5' },
  lg: { root: 'gap-2 px-4 py-2 text-base leading-6', image: 'size-6' },
}

const colorClasses = computed(() => colors[props.color] ?? colors['secondary-subtle'])
const sizeClasses = computed(() => sizes[props.size] ?? sizes.xs)
</script>
