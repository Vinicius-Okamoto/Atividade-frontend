import { test, expect } from '@playwright/test';

test.describe('CHAP landing — smoke flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads and header is visible', async ({ page }) => {
    // target the header logo specifically by its aria-label
    await expect(page.locator('a[aria-label="CHAP — início"]').first()).toBeVisible();
    // basic content present (heading)
    await expect(page.getByRole('heading', { name: /CUIDADO ESSENCIAL/i })).toBeVisible();
  });

  test('navigate to purchase section and open purchase modal', async ({ page }) => {
    // navigate to purchase section via link
    await page.getByRole('link', { name: /Encontre a sua versão/i }).click();
    await expect(page.locator('section#comprar')).toBeVisible();

    // open purchase modal
    await page.getByRole('button', { name: /Comprar agora/i }).click();
    const dialog = page.locator('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/SIMULAÇÃO ACADÊMICA/i)).toBeVisible();

    // confirm fictitious order and expect success state
    await dialog.getByRole('button', { name: /Confirmar pedido fictício/i }).click();
    await expect(dialog.getByText(/TUDO CERTO/i)).toBeVisible();
  });

  test('select different product from collection updates purchase name', async ({ page }) => {
    // go to collection
    await page.getByRole('link', { name: /Encontre a sua versão/i }).click();
    await expect(page.locator('section#versoes')).toBeVisible();

    // select CHAP Urban
    await page.locator('button:has-text("CHAP Urban")').click();
    // ensure purchase section shows selected product name
    await page.locator('a:has-text("Encontre a sua versão")').click();
    await expect(page.locator('section#comprar').getByText('CHAP Urban')).toBeVisible();
  });
});
