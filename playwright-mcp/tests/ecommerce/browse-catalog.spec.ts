import { test, expect } from '@playwright/test';

test.describe('Product catalog', () => {
  test('displays all products and their card details', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/demo-website/demo_testing_website.html');
    await page.getByRole('button', { name: 'Product Catalog' }).click();

    await expect(page.getByRole('heading', { name: 'Sandbox Product Store' })).toBeVisible();

    const products = [
      { name: 'Wireless Pro Headphones', category: 'Audio', rating: '4.8', price: '$129.00' },
      { name: 'Ergonomic Mechanical Keyboard', category: 'Accessories', rating: '4.9', price: '$89.50' },
      { name: 'UltraWide 4K Monitor 27"', category: 'Displays', rating: '4.7', price: '$399.00' },
      { name: 'Precision Gaming Mouse', category: 'Accessories', rating: '4.6', price: '$59.99' },
      { name: 'USB-C Multiport Hub', category: 'Accessories', rating: '4.5', price: '$45.00' },
      { name: 'Noise-Canceling Earbuds', category: 'Audio', rating: '4.7', price: '$89.00' },
    ];

    const productGrid = page.locator('#product-grid');
    await expect(productGrid.locator(':scope > div')).toHaveCount(products.length);

    for (const product of products) {
      const card = productGrid.locator(':scope > div').filter({
        has: page.getByRole('heading', { name: product.name, exact: true }),
      });

      await expect(card).toHaveCount(1);
      await expect(card.getByText(product.category, { exact: true })).toBeVisible();
      await expect(card.getByText(product.rating, { exact: true })).toBeVisible();
      await expect(card.getByText(product.price, { exact: true })).toBeVisible();
      await expect(card.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
    }

    await expect(page.getByRole('button', { name: 'View Cart (0)' })).toBeVisible();
  });
});