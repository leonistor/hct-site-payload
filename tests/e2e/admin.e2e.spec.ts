import { test, expect } from '@playwright/test'

test.describe('Admin', () => {
  test('can go to admin', async ({ page }) => {
    await page.goto('http://localhost:3000/admin')

    await expect(page).toHaveTitle(/Login - Payload/)
  })
})
