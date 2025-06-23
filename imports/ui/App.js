import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './App.html';
import './management/BookList';
import './management/Dashboard';

const TEMPLATE_STRING = 'template';
const APP_TEMPLATES = {
    'books': 'bookList',
    'dashboard': 'dashboard',
}

Template.main.onCreated(function onMainTemplateCreated() {
    this.state = new ReactiveDict();

    this.state.set(TEMPLATE_STRING, APP_TEMPLATES['dashboard']);
});

Template.main.helpers({
    getTemplate() {
        const instance = Template.instance();
        return instance.state.get(TEMPLATE_STRING);
    }
});

Template.main.events({
    'click .link'(e, instance) {
        e.preventDefault();

        instance.state.set(TEMPLATE_STRING, APP_TEMPLATES[e.target.dataset.route]);
    }
})