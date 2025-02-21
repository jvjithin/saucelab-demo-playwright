import { TestDataType } from './constants';
import { env } from './environment';

export const TestData: TestDataType = {
    login: {
        validUser: {
            username: env.credentials.username,
            password: env.credentials.password
        }
    },
    checkout: {
        shippingDetails: {
            firstName: 'John',
            lastName: 'Doe',
            postalCode: '12345'
        }
    }
};