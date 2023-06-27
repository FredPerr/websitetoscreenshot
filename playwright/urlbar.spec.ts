import { test, expect } from '@playwright/test'

test('URLBar', async ({ page }) => {
    await page.goto('./')
    const urlbar_input = page.getByRole('textbox', { name: 'url' })
    await expect(urlbar_input).toHaveValue('')
    const error = page.getByTestId('urlbar-error-label')
    const error_count = await error.count()
    expect(error_count).toBe(0)
    await urlbar_input.focus()
    await urlbar_input.blur()
    await expect(error).toContainText('No URL was provided')
    await urlbar_input.fill('https://google.com')
    await expect(urlbar_input).toHaveValue('https://google.com')
    // await urlbar_input.focus()
    // await urlbar_input.blur()
})
