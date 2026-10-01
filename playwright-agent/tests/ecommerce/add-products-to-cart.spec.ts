import { test, expect } from '@playwright/test';
import { EcommerceStorePage } from '../pages/EcommerceStorePage';

test.describe('E-commerce Core Operations', () => {
  test('Add products to the cart', async ({ page }) => {
    const store = new EcommerceStorePage(page);

    // 1. From a fresh state, open Product Catalog and add Wireless Pro Headphones ($129.00) once.
    await store.goto();
    await store.openCatalog();
    await store.addProduct('Wireless Pro Headphones');

    await expect(store.addedProductConfirmation('Wireless Pro Headphones')).toBeVisible();
    await expect(store.cartCountButton(1)).toBeVisible();

    // 2. Add Ergonomic Mechanical Keyboard ($89.50), then open View Cart.
    await store.addProduct('Ergonomic Mechanical Keyboard');
    await store.openCart();

    await expect(store.cartHeading).toBeVisible();
    await expect(store.cartItemQuantity('$129.00', 1)).toBeVisible();
    await expect(store.cartItemQuantity('$89.50', 1)).toBeVisible();
    await expect(store.cartSubtotal()).toContainText('$218.50');
    await expect(store.cartCountButton(2)).toBeVisible();
  });
});
