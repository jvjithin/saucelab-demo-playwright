import { test, expect } from '@playwright/test';

test.describe('Sauce Labs Checkout Flow', () => {
    const USERNAME = 'standard_user';
    const PASSWORD = 'secret_sauce';

    test('should complete the checkout flow with 3 random items', async ({ page }) => {
        // Step 1: Log in to the website
        await page.goto('/');
        await page.fill('[data-test="username"]', USERNAME);
        await page.fill('[data-test="password"]', PASSWORD);
        await page.click('[data-test="login-button"]');

        // Step 2: Add 3 random items to the cart
        const items = await page.$$('.inventory_item button');
        for (let i = 0; i < 3; i++) {
            await items[i].click();
        }

        // Step 3: Navigate to the cart and verify the items
        await page.click('.shopping_cart_link');
        const cartItems = await page.$$('.cart_item');
        expect(cartItems.length).toBe(3);

        // Step 4: Proceed to checkout
        await page.click('[data-test="checkout"]');
        await page.fill('[data-test="firstName"]', 'John');
        await page.fill('[data-test="lastName"]', 'Doe');
        await page.fill('[data-test="postalCode"]', '12345');
        await page.click('[data-test="continue"]');

        // Step 5: Verify checkout overview and complete the order
        const overviewItems = await page.$$('.cart_item');
        expect(overviewItems.length).toBe(3);
        await page.click('[data-test="finish"]');

        // Step 6: Verify order confirmation
        const confirmationText = await page.textContent('.complete-header');
        expect(confirmationText).toEqual('Thank you for your order!');
    });
});
