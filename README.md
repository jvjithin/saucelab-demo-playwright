# Sauce Labs Demo - Playwright Test Framework

A robust test automation framework built with Playwright for testing the Sauce Labs demo site.

## 🚀 Framework Structure

```
├── config/                   # Configuration files
│   ├── constants.ts         # Selectors and common constants
│   ├── environment.ts       # Environment configuration handler
│   └── testData.ts         # Test data management
├── src/                     # Source files
│   ├── pages/              # Page Object Models
│   │   ├── BasePage.ts     # Base page with common functionality
│   │   ├── LoginPage.ts    # Login page actions
│   │   ├── InventoryPage.ts# Inventory page actions
│   │   ├── CartPage.ts     # Cart page actions
│   │   └── CheckoutPage.ts # Checkout page actions
│   └── utils/              # Utility functions
│       └── helpers.ts      # Common helper functions
└── tests/                  # Test files
    └── checkoutFlow.spec.ts # E2E test scenarios

```

## 🛠️ Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npm run install:browsers
```

3. Create a `.env` file in the root directory (use .env.example as template)

## 🧪 Running Tests

Run tests in different environments:
- Development: `npm run test:dev`
- Staging: `npm run test:staging`
- Production: `npm run test:prod`

Additional commands:
- Run with UI: `npm run test:ui`
- Run in debug mode: `npm run test:debug`
- Run in headed mode: `npm run test:headed`
- Run in parallel: `npm run test:parallel --workers=5`

## 📊 Test Reports

- HTML Report: `npm run report:html`
- JUnit Report: `npm run report:junit`

## 🔧 Configuration

The framework supports multiple environments through the `.env` file:
- Browser settings
- Environment URLs
- Test credentials
- Timeouts
- Test execution settings

## 🏗️ Framework Features

- Page Object Model design
- Environment-specific configuration
- Type-safe selectors and test data
- Parallel test execution
- Multiple reporting formats
- Cross-browser testing
- Error handling and logging
- Screenshot and video capture on failure
- CI/CD ready configuration