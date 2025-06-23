import { Meteor } from 'meteor/meteor';
import { SalesCollection } from '../db/SalesCollection';
import { Mongo } from 'meteor/mongo';

const SalesPerGenreCollection = new Mongo.Collection('sales_per_genre');

let isUpdating = false;

async function updateSalesPerGenreCollection() {
    if (isUpdating) return;

    isUpdating = true;

    try {
        const documents = await SalesCollection.rawCollection().aggregate([
            { $unwind: '$books' },
            { $set: { 'book': '$books' }},
            { $unwind: '$book.genre' },
            { $group: { _id: '$book.genre', revenue: { $sum: '$book.price' }, salesCount: { $sum: 1 } }},
        ]).toArray();

        await SalesPerGenreCollection.rawCollection().drop();

        if (documents.length > 0) {
            await SalesPerGenreCollection.rawCollection().insertMany(documents);
        }
    } catch (err) {
        console.error('Error updating SalesPerGenreCollection: ', err);
    } finally {
        isUpdating = false;
    }
}

SalesCollection.find({}).observe({
    added(_doc) { updateSalesPerGenreCollection() },
    changed(_newDoc, _oldDoc) { updateSalesPerGenreCollection() },
    removed(_oldDoc) { updateSalesPerGenreCollection() },
});

updateSalesPerGenreCollection();

Meteor.publish('sales_per_genre', function publishSalesPerGenre() {
    return SalesPerGenreCollection.find({});
});