<template>
  <div
    v-if="show"
    class="notification flex gap-2 p-3 border rounded-lg"
    :class="colorClasses.background"
  >
    <Icon
      v-if="icon"
      :name="icon"
      :class="colorClasses.icon"
    />

    <div class="w-full">
      <slot />
    </div>

    <Icon
      v-if="closeButton"
      name="eva:close-outline"
      class="cursor-pointer"
      :class="colorClasses.close"
      @click.prevent="close"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  tone: String,
  icon: String,
  closeButton: {
    type: Boolean,
    default: false,
  },
})

const show = ref(true)

const colors = {
  'brand-primary': 'bg-brand-primary text-white border-transparent',
  'brand-primary-subtle': 'bg-brand-primary-subtlest text-brand-primary-strong border-brand-primary',
  'spotlight-subtle': 'bg-spotlight text-blue-800 border-border-spotlight',
  'spotlight-strong': 'bg-blue-700 text-white border-transparent',
  'positive-subtle': 'bg-green-100 text-green-800 border-green-600',
  'positive-strong': 'bg-green-700 text-white border-transparent',
  'warning-subtle': 'bg-warning text-orange-800 border-orange-400',
  'warning-strong': 'bg-orange-700 text-white border-transparent',
  'negative-subtle': 'bg-red-100 text-red-800 border-red-600',
  'negative-strong': 'bg-red-700 text-white border-transparent',
  'neutral-subtle': 'bg-neutral-subtlest text-text-default border-border-default-strong',
  'neutral-strong': 'bg-grey-700 text-white border-transparent',
}

const aliases = {
  info: 'spotlight-subtle',
  warning: 'warning-subtle',
  error: 'negative-subtle',
}

const colorClasses = computed(() => {
  const tone = aliases[props.tone] ?? props.tone
  const strong = tone === 'brand-primary' || tone?.endsWith('-strong')

  return {
    background: colors[tone],
    icon: tone === 'brand-primary-subtle' ? 'text-brand-primary' : 'text-current',
    close: strong ? 'text-white' : 'text-grey-700',
  }
})

const close = () => {
  show.value = false
}
</script>

<style>
@reference '../assets/style.css';

.notification a {
    @apply font-semibold text-current;
}
</style>
