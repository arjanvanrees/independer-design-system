<template>
  <div class="mb-4 desktop:hidden">
    <div class="relative flex flex-col p-4 bg-white rounded-xl shadow-sm z-10 tablet:p-6">
      <h3>{{ title[domain] }}</h3>

      <div class="flex flex-col items-start pt-4">
        <ShoppingcartSummary
          :company="company"
          :logo="logo"
          :product="product"
        />
        <button
          class="text-purple hover:text-purple-dark"
          @click.prevent="$emit('toggleModalCart')"
        >
          Uitleg van je premie
        </button>
      </div>
    </div>

    <div class="flex -mt-6 pt-10 p-4 font-semibold text-white bg-purple-dark rounded-b-xl tablet:px-6">
      {{ totalText[domain] }}
      <PriceQuote
        :price="total"
        class="ml-auto"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  logo: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  domain: {
    type: String,
    default: 'zorg',
  },
})

defineEmits(['toggleModalCart'])

const title = {
  energy: 'Je energicontract',
  zorg: 'Je zorgverzekering',
  auto: 'Je autoverzekering',
  fiets: 'Je fietsverzekering',
}

const totalText = {
  energy: 'Geschat maandbedrag',
  zorg: 'Je betaalt per maand',
  auto: 'Per maand',
  fiets: 'Je betaalt per maand',
}
</script>
