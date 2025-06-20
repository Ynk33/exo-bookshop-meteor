import { faker } from "@faker-js/faker";
import { BooksCollection } from "../BooksCollection";
import { CustomersCollection } from "../CustomersCollection";

const getRandomCustomer = (customers) => {
    const shuffled = customers.slice().sort(() => 0.5 - Math.random());
    return shuffled[0];
}

const getRandomBooks = (books, maxBooks) => {
    const nbOfBooks = Math.ceil(Math.random() * maxBooks);
    const shuffled = books.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, nbOfBooks);
}

export const getSales = async () => {
    const customers = await CustomersCollection.find({}).fetch();
    const books = await BooksCollection.find({}).fetch();

    const sales = [];
    for (let i = 0; i < 100; i++) {
        let soldBooks = getRandomBooks(books, 5);
        sales.push({
            customerId: getRandomCustomer(customers)._id,
            books: soldBooks,
            price: soldBooks.reduce((price, book) => price += parseFloat(book.price), 0),
            date: faker.date.recent()
        });
    }

    return sales;
}