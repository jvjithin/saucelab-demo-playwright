import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Selectors } from '../../config/constants';

export class CheckoutPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async fillShippingDetails(firstName: string, lastName: string, postalCode: string) {
        await this.fill(Selectors.checkout.firstName, firstName);
        await this.fill(Selectors.checkout.lastName, lastName);
        await this.fill(Selectors.checkout.postalCode, postalCode);
        await this.click(Selectors.checkout.continueButton);
        await this.waitForPageLoad();
    }

    async getOverviewItemCount() {
        return await this.getCount(Selectors.cart.items);
    }

    async completeOrder() {
        await this.click(Selectors.checkout.finishButton);
        await this.waitForPageLoad();
    }

    async getConfirmationMessage() {
        return await this.getText(Selectors.checkout.confirmationHeader);
    }
}