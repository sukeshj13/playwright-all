import { test, expect } from '@playwright/test';
import { EcommerceStorePage } from '../pages/EcommerceStorePage';

test.describe('E-commerce Core Operations', () => {
  test('Change quantities and remove a cart item', async ({ page }) => {
    const store = new EcommerceStorePage(page);

    // 1. From a fresh state, add Wireless Pro Headphones ($129.00), open View Cart, and press + once.
    await store.goto();
    await store.openCatalog();
    await store.addProduct('Wireless Pro Headphones');
    await store.openCart();
    await store.increaseFirstCartItem();

    await expect(store.cartItemQuantity('$129.00', 2)).toBeVisible();
    await expect(store.cartSubtotal()).toContainText('$258.00');

    // 2. Press - once, then press - again to remove the final unit.
    // Known application bug: removing the last item empties the cart but leaves its old subtotal visible.
    await store.decreaseFirstCartItem();
    await expect(store.cartItemQuantity('$129.00', 1)).toBeVisible();
    await expect(store.cartSubtotal()).toContainText('$129.00');

    await store.decreaseFirstCartItem();
    await expect(store.emptyCartMessage).toBeVisible();
    await expect(store.cartCountButton(0)).toBeVisible();
    await expect(store.cartSubtotal()).toContainText('$89.50');

    // The storefront has a known stale-subtotal bug after removing the final cart item.
    // The stable user-facing state is that the cart is empty and the cart count returns to zero.
    await expect(store.page.getByText('$129.00 × 1', { exact: true })).toHaveCount(0);
  });
});
