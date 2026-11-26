# Independer Design System

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Independer Design System for Nuxt 4.

## Features

- ⛰ &nbsp;Create interactive prototypes with the included components
- 🧑‍💻 &nbsp;Built for Nuxt 4
- 🧩 &nbsp;Auto-registers components with an `Ind` prefix

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxt module add independer-design-system
```

That's it! You can now use Independer Design System in your Nuxt app ✨

```vue
<template>
  <IndFormInput v-model="name" name="name" label="Naam" />
  <IndButton label="Versturen" tone="filled-yellow" />
</template>

<script setup>
const name = ref('')
</script>
```

By default, the module registers the following components:

- `IndButton`
- `IndButtonToggle`
- `IndDialog`
- `IndExpandableCard`
- `IndExpandableFilter`
- `IndFooter`
- `IndFormCheckbox`
- `IndFormCheckboxProduct`
- `IndFormCombobox`
- `IndFormFieldset`
- `IndFormInput`
- `IndFormLabel`
- `IndFormRadio`
- `IndFormRadioGroup`
- `IndFormRadioProduct`
- `IndFormRow`
- `IndFormSelect`
- `IndFormTabs`
- `IndFormTextarea`
- `IndHeader`
- `IndLogo`
- `IndMenuAccount`
- `IndMenuButton`
- `IndMenuEnergie`
- `IndMenuKennis`
- `IndMenuKennisbank`
- `IndMenuKlantenservice`
- `IndMenuProducts`
- `IndMenuVerzekeringen`
- `IndModal`
- `IndNotification`
- `IndPill`
- `IndPrice`
- `IndPriceQuote`
- `IndShoppingcartFooter`
- `IndShoppingcartIndex`
- `IndShoppingcartMobile`
- `IndShoppingcartSummary`
- `IndStepsIndicator`
- `IndSubmenuExpand`
- `IndSubmenuItem`
- `IndSubmenuProduct`
- `IndUSP`

Use the module in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['independer-design-system'],
})
```

Run the local playground to see the base form components in context:

```bash
npm run dev
```

## Pills

`IndPill` accepts a `color` matching the [Figma pill roles](https://www.figma.com/design/OVy77dgdz9wKlYCpVxLNY4/DS2-Components?node-id=601-4551):
`neutral-subtle`, `neutral-strong`, `spotlight-subtle`, `spotlight-strong`,
`brand-primary-subtle`, `brand-primary`, `brand-primary-strong`,
`positive-subtle`, `positive-strong`, `warning-subtle`, `warning-strong`,
`negative-subtle`, `negative-strong`, `accent-magenta-strong`,
`accent-yellow-subtle`, `accent-yellow-strong`, and `disabled`.
Existing outline, expert-advice, and legacy color names remain supported.

## Header menus

Desktop header menus open on the first click and close on the second click.
Clicking outside a menu closes it; clicks inside its dropdown keep it open.

## Radio groups

`IndFormRadioGroup` accepts a shared `v-model`, a unique `name`, a `label`, and
options with unique string or boolean `value`s, `label`, and optional `id` and
`disabled` fields. The default slot can contain help text; `error` displays a
validation message. Changing the options does not change the model automatically.

```vue
<template>
  <IndFormRow>
    <IndFormRadioGroup
      v-model="energy.connectionType"
      name="connectionType"
      label="Wat heb je nodig?"
      :options="connectionOptions"
    >
      <p v-if="!energy.connectionHasGas" class="text-grey-dark">
        We zien dat er geen gasaansluiting is op jouw adres. Daarom selecteren we 'Alleen stroom' automatisch.
      </p>
    </IndFormRadioGroup>
  </IndFormRow>

  <IndFormRow>
    <IndFormRadioGroup
      v-model="energy.checkout.geslacht"
      name="geslacht"
      label="Geslacht"
      :options="genderOptions"
      :error="errors.geslacht"
    />
  </IndFormRow>
</template>

<script setup>
const connectionOptions = computed(() => [
  ...(energy.connectionHasGas ? [{ value: 'ElektraEnGas', label: 'Stroom en gas' }] : []),
  { value: 'Elektra', label: 'Alleen stroom', disabled: !energy.connectionHasGas },
  ...(energy.connectionHasGas ? [{ value: 'Gas', label: 'Alleen gas' }] : []),
])
const genderOptions = [
  { value: 'man', label: 'Man' },
  { value: 'vrouw', label: 'Vrouw' },
]
</script>
```

Set `energy.connectionType` to `'Elektra'` in the application when there is no
gas connection.

## Searchable combobox

```vue
<template>
  <IndFormCombobox
    v-model="supplier"
    name="supplier"
    label="Van wie krijg je nu energie?"
    :options="['Eneco', 'Essent', 'Vattenfall']"
    button-label="Toon energieleveranciers"
    empty-message="Geen leverancier gevonden."
    :error="supplierError"
    @update:model-value="selectSupplier"
  />
</template>

<script setup>
const supplier = ref(null)
const supplierError = ref('')
function selectSupplier(value) {
  supplierError.value = value === null ? 'Kies een leverancier.' : ''
}
</script>
```

Options can be strings or `{ label, value }` objects with unique string/number
values. The model contains the selected value, not the option object. Filtering
is case-insensitive and uses the label. Clearing the input sets the model to
`null` by default; use `:nullable="false"` to prevent clearing the selection.

Use `disabled`, `placeholder`, `label-classes`, and `error` as with other form
components. `name` is required and provides the input ID and form field name.
Supply a visible `label` for accessibility. `leading-icon` defaults to the search
icon; set it to `""` to hide it. The component fills its container, so apply any
desired width to the component or its parent.

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run the default Nuxt module SSR smoke test
  npm run test
  npm run test:watch
  
  # Create and push a new version tag; GitHub Actions publishes it to npm
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/independer-design-system/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/independer-design-system

[npm-downloads-src]: https://img.shields.io/npm/dm/independer-design-system.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/independer-design-system

[license-src]: https://img.shields.io/npm/l/independer-design-system.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/independer-design-system

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt
[nuxt-href]: https://nuxt.com
