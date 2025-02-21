import { env } from './environment';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface ShippingDetails {
    firstName: string;
    lastName: string;
    postalCode: string;
}

export interface TestDataType {
    login: {
        validUser: LoginCredentials;
    };
    checkout: {
        shippingDetails: ShippingDetails;
    };
}

export interface LoginSelectors {
    username: string;
    password: string;
    loginButton: string;
}

export interface InventorySelectors {
    items: string;
    cartLink: string;
}

export interface CartSelectors {
    items: string;
    checkoutButton: string;
}

export interface CheckoutSelectors {
    firstName: string;
    lastName: string;
    postalCode: string;
    continueButton: string;
    finishButton: string;
    confirmationHeader: string;
}

export interface SelectorsType {
    login: LoginSelectors;
    inventory: InventorySelectors;
    cart: CartSelectors;
    checkout: CheckoutSelectors;
}

export interface ConfigType {
    baseUrl: string;
    defaultTimeout: number;
}

export const Selectors: SelectorsType = {
    login: {
        username: '[data-test="username"]',
        password: '[data-test="password"]',
        loginButton: '[data-test="login-button"]'
    },
    inventory: {
        items: '.inventory_item button',
        cartLink: '.shopping_cart_link'
    },
    cart: {
        items: '.cart_item',
        checkoutButton: '[data-test="checkout"]'
    },
    checkout: {
        firstName: '[data-test="firstName"]',
        lastName: '[data-test="lastName"]',
        postalCode: '[data-test="postalCode"]',
        continueButton: '[data-test="continue"]',
        finishButton: '[data-test="finish"]',
        confirmationHeader: '.complete-header'
    }
};

export const Config: ConfigType = {
    baseUrl: env.baseUrl,
    defaultTimeout: env.timeouts.default
};