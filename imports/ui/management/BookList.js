import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { BooksCollection } from '../../db/BooksCollection';

import './BookList.html';
import './BookRow';

const IS_LOADING_STRING = 'isLoading';

Template.bookList.onCreated(function onBookListCreated() {
    this.state = new ReactiveDict();

    const handler = Meteor.subscribe('books');
    Tracker.autorun(() => {
        this.state.set(IS_LOADING_STRING, !handler.ready());
    });
});

Template.bookList.helpers({
    isLoading() {
        const instance = Template.instance();
        return instance.state.get(IS_LOADING_STRING);
    },

    books() {
        return BooksCollection.find({}).fetch();
    }
});

