import { expect, type Locator, type Page } from '@playwright/test';

export class EcommerceStorePage {
  readonly productCatalogNavigation: Locator;
  readonly catalogHeading: Locator;
  readonly productCards: Locator;
  readonly cartButton: Locator;
  readonly cartHeading: Locator;
  readonly emptyCartMessage: Locator;
  readonly emptyCartCheckoutMessage: Locator;
  readonly orderConfirmation: Locator;
  readonly subtotalLabel: Locator;
  readonly checkoutButton: Locator;
  readonly toastMessages: Locator;
  readonly visibleCheckoutFields: Locator;

  constructor(private readonly page: Page) {
    this.productCatalogNavigation = page.getByRole('button', { name: 'Product Catalog' });
    this.catalogHeading = page.getByRole('heading', { name: 'Sandbox Product Store' });
    this.productCards = page.locator('main .group.bg-white');
    this.cartButton = page.getByRole('button', { name: /^View Cart \(\d+\)$/ });
    this.cartHeading = page.getByRole('heading', { name: 'Your Shopping Cart' });
    this.emptyCartMessage = page.getByText('Your cart is empty.', { exact: true });
    this.emptyCartCheckoutMessage = page.getByText('Your cart is empty!', { exact: true });
    this.orderConfirmation = page.getByText('Order placed successfully! Sandbox simulation completed.', { exact: true });
    this.subtotalLabel = page.getByText('Subtotal:', { exact: true });
    this.checkoutButton = page.getByRole('button', { name: 'Proceed to Checkout' });
    this.toastMessages = page.locator('#toast-container > *');
    this.visibleCheckoutFields = page.locator('input:visible, select:visible, textarea:visible');
  }

  async goto(): Promise<void> {
    await this.page.goto('http://127.0.0.1:5500/demo-website/demo_testing_website.html');
  }

  async openCatalog(): Promise<void> {
    await this.productCatalogNavigation.click();
    await this.catalogHeading.waitFor({ state: 'visible' });
  }

  productCard(productName: string): Locator {
    return this.productCards.filter({ hasText: productName });
  }

  async addProduct(productName: string): Promise<void> {
    await this.productCard(productName).getByRole('button', { name: 'Add to Cart' }).click();
  }

  addedProductConfirmation(productName: string): Locator {
    return this.page.getByText(`Added ${productName} to cart!`, { exact: true });
  }

  cartCountButton(count: number): Locator {
    return this.page.getByRole('button', { name: `View Cart (${count})` });
  }

  async openCart(): Promise<void> {
    await this.cartButton.click();
    await this.cartHeading.waitFor({ state: 'visible' });
  }

  async increaseFirstCartItem(): Promise<void> {
    await this.page.getByRole('button', { name: '+' }).click();
  }

  async decreaseFirstCartItem(): Promise<void> {
    await this.page.getByRole('button', { name: '-' }).click();
  }

  cartItemQuantity(price: string, quantity: number): Locator {
    return this.page.getByText(`${price} × ${quantity}`, { exact: true });
  }

  cartSubtotal(): Locator {
    return this.subtotalLabel.locator('..');
  }

  async proceedToCheckout(): Promise<void> {
    await expect(this.toastMessages).toHaveCount(0);
    await this.checkoutButton.click();
  }
}
