import { addComponentsDir, createResolver, defineNuxtModule } from '@nuxt/kit'

type ModuleOptions = Record<string, never>

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

  setup(options, nuxt) {
    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      prefix: 'Ind',
      pathPrefix: true,
    })
  },
})
