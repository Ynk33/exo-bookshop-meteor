import { faker } from "@faker-js/faker";

const generateAuthor = () => {
	return {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		birthdate: faker.date.birthdate(),
		country: faker.location.country()
	}
}

export const getAuthors = () => faker.helpers.multiple(generateAuthor, { count: 20 });