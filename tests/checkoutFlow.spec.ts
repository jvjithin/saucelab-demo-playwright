import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { TestData } from '../config/testData';
import { Logger } from '../src/utils/logger';

test.describe('Sauce Demo Checkout Flow', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeAll(async () => {
        Logger.info('Starting Sauce Demo Checkout Flow Test Suite');
    });

    test.beforeEach(async ({ page }, testInfo) => {
        Logger.setCurrentTest(testInfo.title);
        Logger.info('Initializing page objects');
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
    });

    test.afterEach(async ({ }, testInfo) => {
        Logger.info(`Test finished with status: ${testInfo.status}`);
        if (testInfo.status !== 'passed') {
            Logger.error(`Test failed: ${testInfo.error?.message}`);
        }
    });

    test('complete purchase flow with multiple items', async () => {
        Logger.info('Starting purchase flow test');

        // Login
        Logger.info('Performing login');
        await loginPage.navigate();
        await loginPage.login(
            TestData.login.validUser.username,
            TestData.login.validUser.password
        );

        // Add items to cart
        Logger.info('Adding items to cart');
        await inventoryPage.addRandomItemsToCart(2);
        await inventoryPage.navigateToCart();

        // Verify cart and checkout
        Logger.info('Verifying cart items');
        const cartItemCount = await cartPage.getCartItemCount();
        expect(cartItemCount).toBe(2);
        await cartPage.proceedToCheckout();

        // Complete checkout
        Logger.info('Completing checkout process');
        const { firstName, lastName, postalCode } = TestData.checkout.shippingDetails;
        await checkoutPage.fillShippingDetails(firstName, lastName, postalCode);
        
        // Verify overview and complete order
        Logger.info('Verifying order overview');
        const overviewItemCount = await checkoutPage.getOverviewItemCount();
        expect(overviewItemCount).toBe(2);
        
        Logger.info('Completing order');
        await checkoutPage.completeOrder();
        const confirmMessage = await checkoutPage.getConfirmationMessage();
        expect(confirmMessage).toBe('Thank you for your order!');
        
        Logger.info('Purchase flow test completed successfully');
    });
});
