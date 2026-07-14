<template>
  <Transition name="price-fade" mode="out-in">
    <div :key="price">
      {{ textPrepend }}

      <template v-if="withoutSymbol">
        {{ $n(price, 'currencyNoSymbol') }}
      </template>
      <template v-else>
        {{ $n(price, 'currency') }}
      </template>

      {{ textAppend }}
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const props = defineProps({
  price: {
    type: Number,
    required: true
  },
  withoutSymbol: {
    type: Boolean,
    default: false
  },
  textPrepend: String,
  textAppend: String
})
</script>

<style>
@reference '../../assets/style.css';

.price-fade-enter-active,
.price-fade-leave-active {
    @apply transition-all ease-out duration-400 transform-gpu;
}

.price-fade-enter-from,
.price-fade-leave-to {
    @apply opacity-0;
}
</style>