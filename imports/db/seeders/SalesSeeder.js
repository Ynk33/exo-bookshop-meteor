import { faker } from "@faker-js/faker";
import { BooksCollection } from "../BooksCollection";
import { CustomersCollection } from "../CustomersCollection";
import { utils } from "../../utils/utils";

export const getSales = async () => {
    const customers = await CustomersCollection.find({}).fetch();
    const books = await BooksCollection.find({}).fetch();

    const sales = [];
    for (let i = 0; i < 100; i++) {
        let soldBooks = utils.array.getRandomNumberOfElementFrom(books, 5);
        sales.push({
            customerId: utils.array.getRandomElementFrom(customers)._id,
            books: soldBooks,
            price: soldBooks.reduce((price, book) => price += parseFloat(book.price), 0),
            date: faker.date.recent()
        });
    }

    return sales;
}