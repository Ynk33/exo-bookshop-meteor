import { faker } from "@faker-js/faker";
import { AuthorsCollection } from '../AuthorsCollection';

const getRandomAuthors = (authors) => {
    const nbOfAuthors = Math.ceil(Math.random() * 3);
    const shuffled = authors.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, nbOfAuthors);
}

export const getBooks = async () => {
    const authors = await AuthorsCollection.find({}).fetch();
    const books = [];

    for (let i = 0; i < 20; i++)
    {
        books.push({
            title: faker.book.title(),
            price: faker.commerce.price({min: 5, max: 80}),
            genre: faker.helpers.multiple(faker.book.genre, { min: 1, max: 5 }),
            authors: getRandomAuthors(authors)
        });
    }
    
    return books;
}