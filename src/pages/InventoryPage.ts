import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Selectors } from '../../config/constants';

export class InventoryPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async addRandomItemsToCart(count: number) {
        const items = await this.page.$$(Selectors.inventory.items);
        for (let i = 0; i < count; i++) {
            await items[i].click();
        }
    }

    async navigateToCart() {
        await this.click(Selectors.inventory.cartLink);
        await this.waitForPageLoad();
    }
}