import { AuthorsCollection } from '../AuthorsCollection';
import { BooksCollection } from '../BooksCollection';
import { CustomersCollection } from '../CustomersCollection';
import { SalesCollection } from '../SalesCollection';
import { ReviewsCollection } from '../ReviewsCollection';

import { getAuthors } from './AuthorsSeeder';
import { getBooks } from './BooksSeeder';
import { getCustomers } from './CustomersSeeder';
import { getSales } from './SalesSeeder';
import { getReviews } from './ReviewsSeeder';

export const seeder = async () => {
    console.log('DROPPING COLLECTIONS...')
    await AuthorsCollection.dropCollectionAsync();
    await BooksCollection.dropCollectionAsync();
    await CustomersCollection.dropCollectionAsync();
    await SalesCollection.dropCollectionAsync();
    await ReviewsCollection.dropCollectionAsync();
    console.log('DROPPING COMPLETE!')

    console.log('');

    console.log("SEEDING...");
    await AuthorsCollection.rawCollection().insertMany(getAuthors());
    await BooksCollection.rawCollection().insertMany(await getBooks());
    await CustomersCollection.rawCollection().insertMany(getCustomers());
    await SalesCollection.rawCollection().insertMany(await getSales());
    await ReviewsCollection.rawCollection().insertMany(await getReviews());
    console.log('SEEDING COMPLETE!');
}