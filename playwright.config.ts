import { defineConfig, devices } from '@playwright/test';
import { env } from './config/environment';

export default defineConfig({
  testDir: './tests',
  timeout: env.timeouts.default,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: env.test.retries,
  workers: env.test.workers,
  reporter: [
    ['html', {
      open: 'never',
      outputFolder: 'playwright-report',
      attachmentsBaseURL: 'attachments',
    }],
    ['list'],
    ['junit', {
      outputFile: 'test-results/junit-report.xml'
    }]
  ],
  use: {
    baseURL: env.baseUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: env.browser.headless,
  },
  outputDir: 'test-results/',
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: env.browser.viewport,
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: env.browser.viewport,
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        viewport: env.browser.viewport,
      },
    },
  ],
});
