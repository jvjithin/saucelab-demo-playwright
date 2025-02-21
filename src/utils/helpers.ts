import { Page } from '@playwright/test';

export async function waitForPageLoad(page: Page) {
    await page.waitForLoadState('networkidle');
}

export async function takeScreenshot(page: Page, name: string) {
    await page.screenshot({ path: `./test-results/screenshots/${name}.png` });
}

export function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}