import { faker } from "@faker-js/faker";

const generateCustomer = () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        birthdate: faker.date.birthdate(),
        country: faker.location.country()
    }
}

export const getCustomers = () => faker.helpers.multiple(generateCustomer, { count: 50 });