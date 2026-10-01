# E-commerce Demo Core User Operations Test Plan

## Application Overview

TestSandbox Pro includes a simulated e-commerce product catalog with six listed products, an in-page shopping cart, quantity controls, subtotal calculation, and simulated checkout. Start every scenario in a fresh browser context at http://127.0.0.1:5500/demo-website/demo_testing_website.html with an empty cart. The storefront is opened from the Product Catalog navigation item. No real payment or fulfillment is performed.

## Test Scenarios

### 1. E-commerce Core Operations

**Seed:** `tests/seed.spec.ts`

#### 1.1. Browse the product catalog

**File:** `tests/ecommerce/browse-catalog.spec.ts`

**Steps:**
  1. In a fresh browser context, open http://127.0.0.1:5500/demo-website/demo_testing_website.html and select Product Catalog from the sidebar.
    - expect: The Sandbox Product Store catalog is displayed.
    - expect: Six products are listed: Wireless Pro Headphones, Ergonomic Mechanical Keyboard, UltraWide 4K Monitor 27", Precision Gaming Mouse, USB-C Multiport Hub, and Noise-Canceling Earbuds.
  2. Review the product cards and cart control.
    - expect: Each product card displays its category, rating, price, and Add to Cart control.
    - expect: The View Cart indicator starts at 0.

#### 1.2. Add products to the cart

**File:** `tests/ecommerce/add-products-to-cart.spec.ts`

**Steps:**
  1. From a fresh state, open Product Catalog and add Wireless Pro Headphones ($129.00) once.
    - expect: A confirmation indicates Wireless Pro Headphones was added.
    - expect: The cart indicator updates to 1.
  2. Add Ergonomic Mechanical Keyboard ($89.50), then open View Cart.
    - expect: The cart contains both selected products, each with quantity 1.
    - expect: The subtotal is $218.50 and the cart indicator reflects two items.

#### 1.3. Change quantities and remove a cart item

**File:** `tests/ecommerce/update-cart.spec.ts`

**Steps:**
  1. From a fresh state, add Wireless Pro Headphones ($129.00), open View Cart, and press + once.
    - expect: The headphone quantity becomes 2.
    - expect: The subtotal updates to $258.00.
  2. Press - once, then press - again to remove the final unit.
    - expect: The quantity returns to 1 and the subtotal returns to $129.00 after the first decrement.
    - expect: After the second decrement, the cart shows its empty-state message, the cart indicator is 0, and the subtotal is $0.00. No stale item price remains.

#### 1.4. Complete checkout with a populated cart

**File:** `tests/ecommerce/complete-checkout.spec.ts`

**Steps:**
  1. From a fresh state, add Wireless Pro Headphones ($129.00) and Ergonomic Mechanical Keyboard ($89.50), then open View Cart.
    - expect: Both products and quantities are correct.
    - expect: The subtotal is $218.50.
  2. Select Proceed to Checkout.
    - expect: A successful order confirmation is displayed.
    - expect: The cart is cleared and the cart indicator returns to 0.
    - expect: Checkout completes as a simulation; no payment or shipping information is requested.

#### 1.5. Prevent checkout from an empty cart

**File:** `tests/ecommerce/empty-cart-checkout.spec.ts`

**Steps:**
  1. From a fresh state, open Product Catalog, select View Cart without adding any products, and inspect the empty cart.
    - expect: The cart displays its empty-state message.
    - expect: The cart indicator is 0 and the subtotal is $0.00.
    - expect: No order is created from an empty cart.
  2. If Proceed to Checkout is available, select it.
    - expect: The application displays an empty-cart validation message such as “Your cart is empty!”.
    - expect: No success confirmation is shown and the cart remains empty.
