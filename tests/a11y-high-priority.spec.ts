import { test, expect } from '@playwright/test';

test.describe('High-priority accessibility and interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('skip link is focusable and works', async ({ page }) => {
    // the skip link is rendered with a CSS module class; select by accessible name
    const skip = page.getByRole('link', { name: /Pular para o conteúdo/i });
    await expect(skip).toBeVisible();
    // programmatically focus and ensure it's in the tab order
    await skip.focus();
    await expect(skip).toBeFocused();
    // activating should move focus to main content anchor
    await skip.press('Enter');
    await expect(page.locator('#conteudo')).toBeVisible();
  });

  test('mobile menu toggles aria-expanded and links navigate', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    // reload so responsive CSS/media queries take effect for this viewport
    await page.reload();
    const toggle = page.locator('button[aria-controls="main-navigation"]');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    // click buy link in nav
    await page.getByRole('link', { name: /Comprar agora/i }).click();
    await expect(page.locator('section#comprar')).toBeVisible();
  });

  test('FAQ accordion toggles aria-expanded and reveals content', async ({ page }) => {
    const questionButton = page.getByRole('button', { name: /O CHAP é um produto real\?/i });
    await expect(questionButton).toHaveAttribute('aria-expanded', 'false');
    await questionButton.click();
    await expect(questionButton).toHaveAttribute('aria-expanded', 'true');
    const answer = page.locator('#answer-0');
    await expect(answer).toBeVisible();
  });

  test('modal traps focus and restores focus to opener', async ({ page }) => {
    const opener = page.getByRole('button', { name: /Comprar agora/i }).first();
    // focus opener and open modal
    await opener.focus();
    await opener.click();

    const dialog = page.locator('dialog');
    await expect(dialog).toBeVisible();

    // first focusable inside dialog should receive focus (close button)
    const first = dialog.locator('button').first();
    await expect(first).toBeFocused();

    // ensure tabbing cycles back to first after pressing Tab equal to number of focusable elements
    const focusableCount = await dialog.evaluate((d) => d.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])').length);
    for (let i = 0; i < focusableCount; i++) await page.keyboard.press('Tab');
    await expect(first).toBeFocused();

    // close and expect focus to return to opener
    await dialog.locator('button[aria-label="Fechar pedido"]').click();
    await expect(opener).toBeFocused();
  });
});
