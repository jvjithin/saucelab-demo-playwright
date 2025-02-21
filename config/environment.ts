import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface EnvironmentConfig {
    baseUrl: string;
    credentials: {
        username: string;
        password: string;
    };
    timeouts: {
        default: number;
        navigation: number;
    };
    browser: {
        name: string;
        viewport: {
            width: number;
            height: number;
        };
        headless: boolean;
    };
    test: {
        retries: number;
        workers: number;
    };
}

class Environment {
    private static config: EnvironmentConfig;

    static init(): EnvironmentConfig {
        const env = process.env.NODE_ENV || 'dev';
        
        this.config = {
            baseUrl: this.getBaseUrl(env),
            credentials: this.getCredentials(env),
            timeouts: {
                default: parseInt(process.env.DEFAULT_TIMEOUT || '30000'),
                navigation: parseInt(process.env.NAVIGATION_TIMEOUT || '10000')
            },
            browser: {
                name: process.env.BROWSER || 'chromium',
                viewport: {
                    width: parseInt(process.env.VIEWPORT_WIDTH || '1280'),
                    height: parseInt(process.env.VIEWPORT_HEIGHT || '720')
                },
                headless: process.env.HEADLESS === 'true'
            },
            test: {
                retries: parseInt(process.env.RETRIES || '2'),
                workers: parseInt(process.env.WORKERS || '2')
            }
        };

        return this.config;
    }

    private static getBaseUrl(env: string): string {
        switch (env) {
            case 'prod':
                return process.env.PROD_BASE_URL || 'https://prod.saucedemo.com';
            case 'staging':
                return process.env.STAGING_BASE_URL || 'https://staging.saucedemo.com';
            default:
                return process.env.DEV_BASE_URL || 'https://www.saucedemo.com';
        }
    }

    private static getCredentials(env: string) {
        switch (env) {
            case 'prod':
                return {
                    username: process.env.PROD_USERNAME || 'prod_user',
                    password: process.env.PROD_PASSWORD || 'prod_pass'
                };
            case 'staging':
                return {
                    username: process.env.STAGING_USERNAME || 'staging_user',
                    password: process.env.STAGING_PASSWORD || 'staging_pass'
                };
            default:
                return {
                    username: process.env.DEV_USERNAME || 'standard_user',
                    password: process.env.DEV_PASSWORD || 'secret_sauce'
                };
        }
    }

    static getConfig(): EnvironmentConfig {
        if (!this.config) {
            return this.init();
        }
        return this.config;
    }
}

export const env = Environment.getConfig();