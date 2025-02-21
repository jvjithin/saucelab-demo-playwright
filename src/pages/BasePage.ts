import { Page } from '@playwright/test';
import { Logger } from '../utils/logger';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected async waitForPageLoad() {
        try {
            await this.page.waitForLoadState('networkidle');
            Logger.debug('Page load completed');
        } catch (error) {
            Logger.error('Page failed to load', error as Error);
            throw error;
        }
    }

    protected async click(selector: string) {
        try {
            Logger.debug(`Clicking element: ${selector}`);
            await this.page.waitForSelector(selector, { state: 'visible' });
            await this.page.click(selector);
            Logger.debug(`Clicked element: ${selector}`);
        } catch (error) {
            Logger.error(`Failed to click element ${selector}`, error as Error);
            throw error;
        }
    }

    protected async fill(selector: string, value: string) {
        try {
            Logger.debug(`Filling element ${selector} with value: ${value}`);
            await this.page.waitForSelector(selector, { state: 'visible' });
            await this.page.fill(selector, value);
            Logger.debug(`Filled element: ${selector}`);
        } catch (error) {
            Logger.error(`Failed to fill element ${selector}`, error as Error);
            throw error;
        }
    }

    protected async getText(selector: string): Promise<string> {
        try {
            Logger.debug(`Getting text from element: ${selector}`);
            await this.page.waitForSelector(selector, { state: 'visible' });
            const text = await this.page.textContent(selector);
            Logger.debug(`Got text from element ${selector}: ${text}`);
            return text?.trim() ?? '';
        } catch (error) {
            Logger.error(`Failed to get text from element ${selector}`, error as Error);
            throw error;
        }
    }

    protected async getCount(selector: string): Promise<number> {
        try {
            Logger.debug(`Getting element count for: ${selector}`);
            await this.page.waitForSelector(selector, { state: 'attached' });
            const elements = await this.page.$$(selector);
            Logger.debug(`Found ${elements.length} elements for selector: ${selector}`);
            return elements.length;
        } catch (error) {
            Logger.error(`Failed to get element count for ${selector}`, error as Error);
            throw error;
        }
    }

    protected async isVisible(selector: string): Promise<boolean> {
        try {
            Logger.debug(`Checking visibility of element: ${selector}`);
            await this.page.waitForSelector(selector, { state: 'attached' });
            const isVisible = await this.page.isVisible(selector);
            Logger.debug(`Element ${selector} visibility: ${isVisible}`);
            return isVisible;
        } catch {
            Logger.debug(`Element ${selector} is not visible`);
            return false;
        }
    }
}