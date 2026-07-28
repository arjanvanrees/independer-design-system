import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['../src/module'],

  devtools: { enabled: true },

  css: ['../src/runtime/assets/style.css'],

  compatibilityDate: 'latest',

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
