import { faker } from "@faker-js/faker";
import { AuthorsCollection } from '../AuthorsCollection';
import { utils } from "../../utils/utils";

export const getBooks = async () => {
    const authors = await AuthorsCollection.find({}).fetch();
    const books = [];

    for (let i = 0; i < 20; i++)
    {
        books.push({
            title: faker.book.title(),
            price: parseFloat(faker.commerce.price({min: 5, max: 80})),
            genre: faker.helpers.multiple(faker.book.genre, { min: 1, max: 5 }),
            authors: utils.array.getRandomNumberOfElementFrom(authors, 3),
        });
    }
    
    return books;
}