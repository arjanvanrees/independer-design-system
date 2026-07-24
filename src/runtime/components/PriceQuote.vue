<template>
  <Transition
    name="price-fade"
    mode="out-in"
  >
    <div :key="price">
      {{ textPrepend }}
      {{ formattedPrice }}
      {{ textAppend }}
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
  withoutSymbol: {
    type: Boolean,
    default: false,
  },
  locale: {
    type: String,
    default: 'nl-NL',
  },
  currency: {
    type: String,
    default: 'EUR',
  },
  textPrepend: String,
  textAppend: String,
})

const formattedPrice = computed(() => {
  if (props.withoutSymbol) {
    return new Intl.NumberFormat(props.locale, {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(props.price)
  }

  return new Intl.NumberFormat(props.locale, {
    style: 'currency',
    currency: props.currency,
    minimumFractionDigits: 2,
  }).format(props.price)
})
</script>

<style>
@reference '../assets/style.css';

.price-fade-enter-active,
.price-fade-leave-active {
    @apply transition-all ease-out duration-400 transform-gpu;
}

.price-fade-enter-from,
.price-fade-leave-to {
    @apply opacity-0;
}
</style>
