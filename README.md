# Independer Design System

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Independer Design System for Nuxt 4.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

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

By default the module registers:

`IndButton`, `IndButtonToggle`, `IndDialog`, `IndModal`, `IndPill`, `IndFormCheckbox`, `IndFormInput`, `IndFormLabel`, `IndFormRadio`, `IndFormRow`, `IndFormSelect`, `IndFormTabs`, and `IndFormTextarea`.

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
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/independer-design-system/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/independer-design-system

[npm-downloads-src]: https://img.shields.io/npm/dm/independer-design-system.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/independer-design-system

[license-src]: https://img.shields.io/npm/l/independer-design-system.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/independer-design-system

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt
[nuxt-href]: https://nuxt.com
