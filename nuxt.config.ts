// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  css: ['./src/runtime/assets/style.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
