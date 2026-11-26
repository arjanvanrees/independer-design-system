<template>
  <IndHeader />
  <div>basic</div>
  <form>
    <IndFormCombobox
      v-model="supplier"
      name="supplier"
      label="Energieleverancier"
      :options="['Eneco', 'Essent', 'Vattenfall']"
      error="Kies een leverancier."
    />
    <output id="supplier-value">{{ JSON.stringify(supplier) }}</output>
    <IndFormCombobox
      v-model="product"
      name="product"
      label="Product"
      :options="[{ label: 'Autoverzekering', value: 0 }, { label: 'Zorgverzekering', value: 1 }]"
      :nullable="false"
    />
    <output id="product-value">{{ JSON.stringify(product) }}</output>
    <IndFormCombobox
      name="disabled"
      label="Niet beschikbaar"
      :options="['Eneco']"
      disabled
    />
    <button
      type="button"
      @click="hasGas = !hasGas"
    >
      Toggle gas
    </button>
    <IndFormRadioGroup
      v-model="connectionType"
      name="connectionType"
      label="Wat heb je nodig?"
      :options="connectionOptions"
    >
      <p v-if="!hasGas">
        Geen gasaansluiting.
      </p>
    </IndFormRadioGroup>
    <IndFormRadioGroup
      v-model="gender"
      name="geslacht"
      label="Geslacht"
      :options="genderOptions"
      error="Kies een optie."
    />
    <IndFormRadioGroup
      v-model="booleanChoice"
      name="booleanChoice"
      label="Boolean"
      :options="booleanOptions"
    />
    <output id="radio-values">{{ connectionType }} / {{ gender }} / {{ JSON.stringify(booleanChoice) }}</output>
  </form>
</template>

<script setup>
import { computed, ref } from 'vue'

const supplier = ref('Essent')
const product = ref(0)
const hasGas = ref(true)
const connectionType = ref('Elektra')
const gender = ref('')
const booleanChoice = ref(false)
const connectionOptions = computed(() => [
  ...(hasGas.value ? [{ value: 'ElektraEnGas', label: 'Stroom en gas' }] : []),
  { value: 'Elektra', label: 'Alleen stroom', disabled: !hasGas.value },
  ...(hasGas.value ? [{ value: 'Gas', label: 'Alleen gas' }] : []),
])
const genderOptions = [
  { id: 'man', value: 'man', label: 'Man' },
  { id: 'vrouw', value: 'vrouw', label: 'Vrouw' },
]
const booleanOptions = [
  { value: true, label: 'Ja' },
  { value: false, label: 'Nee' },
]
</script>
