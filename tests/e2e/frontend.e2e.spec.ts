import { test, expect } from '@playwright/test'
import { conf } from '@/config/site'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(conf.title)
  })
})
