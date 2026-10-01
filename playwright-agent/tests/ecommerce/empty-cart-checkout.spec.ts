import { test, expect } from '@playwright/test';
import { EcommerceStorePage } from '../pages/EcommerceStorePage';

test.describe('E-commerce Core Operations', () => {
  test('Prevent checkout from an empty cart', async ({ page }) => {
    const store = new EcommerceStorePage(page);

    // 1. From a fresh state, open Product Catalog, select View Cart without adding any products, and inspect the empty cart.
    await store.goto();
    await store.openCatalog();
    await store.openCart();

    await expect(store.cartHeading).toBeVisible();
    await expect(store.emptyCartMessage).toBeVisible();
    await expect(store.cartCountButton(0)).toBeVisible();
    await expect(store.cartSubtotal()).toContainText('$0.00');
    await expect(store.orderConfirmation).not.toBeVisible();

    // 2. If Proceed to Checkout is available, select it.
    await store.proceedToCheckout();

    await expect(store.emptyCartCheckoutMessage).toBeVisible();
    await expect(store.orderConfirmation).not.toBeVisible();
    await expect(store.cartCountButton(0)).toBeVisible();
    await expect(store.emptyCartMessage).toBeVisible();
    await expect(store.cartSubtotal()).toContainText('$0.00');
  });
});
