import { Meteor } from 'meteor/meteor';
import { BooksCollection } from '../db/BooksCollection';

Meteor.publish('books', function publishBooks() {
    return BooksCollection.find({});
});