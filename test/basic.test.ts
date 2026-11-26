import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, createPage } from '@nuxt/test-utils/e2e'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('renders the index page', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).toContain('<div>basic</div>')
  })

  it.each(['Producten', 'Kennis & tools', 'Klantenservice', 'Inloggen'])(
    'toggles %s and closes it only on outside clicks',
    async (label) => {
      const page = await createPage('/', { viewport: { width: 1440, height: 900 } })

      try {
        const button = page.getByRole('button', { name: label, exact: true })
          .and(page.locator('header > div > ul > li > button'))
        const menu = button.locator('..')
        const dropdown = menu.locator(':scope > div')
        const outside = page.getByText('basic', { exact: true })

        await outside.click()
        expect(await dropdown.count()).toBe(0)

        await button.click()
        await dropdown.waitFor({ state: 'visible' })
        await dropdown.click({ position: { x: 1, y: 1 } })
        expect(await dropdown.count()).toBe(1)

        await button.click()
        await dropdown.waitFor({ state: 'detached' })

        await button.click()
        await dropdown.waitFor({ state: 'visible' })
        await outside.click()
        await dropdown.waitFor({ state: 'detached' })

        await outside.click()
        expect(await dropdown.count()).toBe(0)
      }
      finally {
        await page.close()
      }
    },
  )

  it('switches menus and keeps product submenus inside the click boundary', async () => {
    const page = await createPage('/', { viewport: { width: 1440, height: 900 } })

    try {
      const productsButton = page.getByRole('button', { name: 'Producten', exact: true })
      const products = productsButton.locator('..').locator(':scope > div')
      const knowledgeButton = page.getByRole('button', { name: 'Kennis & tools', exact: true })
      const knowledge = knowledgeButton.locator('..').locator(':scope > div')

      await productsButton.click()
      await products.getByText('Verzekeringen', { exact: true }).click()
      expect(await products.count()).toBe(1)
      await products.getByText('Autoverzekering', { exact: true }).waitFor({ state: 'visible' })

      await knowledgeButton.click()
      await knowledge.waitFor({ state: 'visible' })
      await products.waitFor({ state: 'detached' })

      await productsButton.click()
      await products.waitFor({ state: 'visible' })
      await knowledge.waitFor({ state: 'detached' })
      expect(await products.getByText('Autoverzekering', { exact: true }).count()).toBe(0)
    }
    finally {
      await page.close()
    }
  })
})
