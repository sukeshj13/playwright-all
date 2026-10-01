import { test, expect } from '@playwright/test';
import { EcommerceStorePage } from '../pages/EcommerceStorePage';

test.describe('E-commerce Core Operations', () => {
  test('Complete checkout with a populated cart', async ({ page }) => {
    const store = new EcommerceStorePage(page);

    // 1. From a fresh state, add Wireless Pro Headphones ($129.00) and Ergonomic Mechanical Keyboard ($89.50), then open View Cart.
    await store.goto();
    await store.openCatalog();
    await store.addProduct('Wireless Pro Headphones');
    await store.addProduct('Ergonomic Mechanical Keyboard');
    await store.openCart();

    await expect(store.cartItemQuantity('$129.00', 1)).toBeVisible();
    await expect(store.cartItemQuantity('$89.50', 1)).toBeVisible();
    await expect(store.cartSubtotal()).toContainText('$218.50');

    // 2. Select Proceed to Checkout.
    await store.proceedToCheckout();

    await expect(store.orderConfirmation).toBeVisible();
    await expect(store.cartCountButton(0)).toBeVisible();
    await expect(store.visibleCheckoutFields).toHaveCount(0);
  });
});
