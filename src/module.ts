import { defineNuxtModule, addPlugin, createResolver, addComponentsDir } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

const resolver = createResolver(import.meta.url)

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'independer-design-system',

    configKey: 'independerDesignSystem',

    compatibility: {
      nuxt: '>=4.2.0',
    },
  },

  moduleDependencies: {
    '@nuxt/icon': {
      version: '>=2.2.1',
    },
  },

  defaults: {},

  setup(options, nuxt) {
    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      prefix: 'I',
      global: true,
    })

    nuxt.options.css.push(resolver.resolve('./runtime/assets/style.css'))

    nuxt.hook('vite:extend', async ({ config }) => {
      const plugin = await import('@tailwindcss/vite').then(r => r.default)
      config.plugins ||= []
      // @ts-expect-error - Vite Plugin type mismatch between @tailwindcss/vite and @nuxt/vite-builder
      config.plugins.push(plugin())
    })

    if (nuxt.options.builder !== '@nuxt/vite-builder') {
      nuxt.options.postcss.plugins['@tailwindcss/postcss'] = {}
    }
  },
})
