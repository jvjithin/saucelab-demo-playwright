import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Selectors, Config } from '../../config/constants';

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async navigate() {
        await this.page.goto(Config.baseUrl);
        await this.waitForPageLoad();
    }

    async login(username: string, password: string) {
        await this.fill(Selectors.login.username, username);
        await this.fill(Selectors.login.password, password);
        await this.click(Selectors.login.loginButton);
    }
}