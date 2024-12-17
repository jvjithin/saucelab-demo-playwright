import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    retries: 1,
    reporter: [['html', { outputFolder: 'test-results', open: 'never' }]],
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 10000,
        baseURL: 'https://www.saucedemo.com/',
    },
});
