import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { SalesPerGenreCollection } from '../../db/SalesPerGenreCollection';

import './Dashboard.html';

const IS_LOADING_STRING = 'isLoading';

Template.dashboard.onCreated(function onDashboardCreated() {
    this.state = new ReactiveDict();

    const handler = Meteor.subscribe('sales_per_genre');
    Tracker.autorun(() => {
        this.state.set(IS_LOADING_STRING, !handler.ready());
    });
});

Template.dashboard.helpers({
    isLoading() {
        const instance = Template.instance();
        return instance.state.get(IS_LOADING_STRING);
    },

    bestSellers() {
        return SalesPerGenreCollection.find({}, { sort: { 'revenue': -1 }, limit: 5 }).fetch();
    }
})