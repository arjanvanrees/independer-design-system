<template>
  <div class="flex font-semibold desktop:text-xl">
    {{ period }}
    <IndPriceQuote
      :price="price"
      class="ml-auto"
    />
  </div>

  <div
    v-if="oneTimeCosts"
    class="flex font-semibold text-white"
  >
    Eenmalige poliskosten
    <IndPriceQuote
      :price="oneTimeCosts"
      class="ml-auto"
    />
  </div>

  <div
    v-if="credits"
    class="text-sm text-white"
  >
    {{ credits }}
  </div>
</template>

<script lang="ts" setup>
defineProps({
  period: {
    type: String,
    default: 'Per maand',
  },
  price: {
    type: Number,
    required: true,
  },
  oneTimeCosts: {
    type: Number,
    required: false,
  },
  credits: String,
})
</script>
