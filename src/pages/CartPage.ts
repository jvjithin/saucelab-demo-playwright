import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Selectors } from '../../config/constants';

export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async getCartItemCount() {
        return await this.getCount(Selectors.cart.items);
    }

    async proceedToCheckout() {
        await this.click(Selectors.cart.checkoutButton);
        await this.waitForPageLoad();
    }
}