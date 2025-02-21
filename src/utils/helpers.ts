export async function waitForPageLoad(page: any) {
    await page.waitForLoadState('networkidle');
}

export async function takeScreenshot(page: any, name: string) {
    await page.screenshot({ path: `./test-results/screenshots/${name}.png` });
}

export function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}