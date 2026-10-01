import { test, expect } from '@playwright/test';
import { EcommerceStorePage } from '../pages/EcommerceStorePage';

test.describe('E-commerce Core Operations', () => {
  test('Browse the product catalog', async ({ page }) => {
    const store = new EcommerceStorePage(page);

    // 1. In a fresh browser context, open the demo site and select Product Catalog from the sidebar.
    await store.goto();
    await store.openCatalog();

    await expect(store.catalogHeading).toBeVisible();
    const expectedProducts = [
      ['Wireless Pro Headphones', 'Audio', '4.8', '$129.00'],
      ['Ergonomic Mechanical Keyboard', 'Accessories', '4.9', '$89.50'],
      ['UltraWide 4K Monitor 27"', 'Displays', '4.7', '$399.00'],
      ['Precision Gaming Mouse', 'Accessories', '4.6', '$59.99'],
      ['USB-C Multiport Hub', 'Accessories', '4.5', '$45.00'],
      ['Noise-Canceling Earbuds', 'Audio', '4.7', '$89.00'],
    ];

    // 2. Review the product cards and cart control.
    await expect(store.productCards).toHaveCount(6);
    for (const [productName, category, rating, price] of expectedProducts) {
      const card = store.productCard(productName);
      await expect(card).toBeVisible();
      await expect(card).toContainText(category);
      await expect(card).toContainText(rating);
      await expect(card).toContainText(price);
      await expect(card.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
    }
    await expect(store.cartCountButton(0)).toBeVisible();
  });
});
