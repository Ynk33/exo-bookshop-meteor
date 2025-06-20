import { Mongo } from 'meteor/mongo';
import { faker } from "@faker-js/faker";
import { SalesCollection } from "../SalesCollection";

// Temporary local collection to store the aggregation pipeline results
const AggregatedSalesCollection = new Mongo.Collection('aggregated_sales', {connection: null});

const aggregateSales = async () => {
    const aggregation = await SalesCollection.rawCollection().aggregate([
        { $unwind: '$books' },
        { $set: { 'book': '$books' }},
        { $set: { 'saleId': '$_id' }},
        { $unset: [ '_id', 'books' ] }
    ]).toArray();

    if (aggregation.length > 0) {
        aggregation.forEach(async aggregate => {
            await AggregatedSalesCollection.insertAsync(aggregate);
        })
    }
}

export const getReviews = async () => {
    await aggregateSales();
    const aggregatedSales = await AggregatedSalesCollection.find({}).fetch();
    
    const reviews = aggregatedSales.map(sale => {
        return {
            bookId: sale.book._id,
            customerId: sale.customerId,
            title: faker.book.title(),
            content: faker.lorem.text()
        };
    });

    return reviews;
}