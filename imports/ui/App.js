import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './App.html';
import './management/BookList';

const STATE_STRING = 'state';
const APP_STATES = {
    'books': 0,
    'dashboard': 1,
}

Template.main.onCreated(function onMainTemplateCreated() {
    this.state = new ReactiveDict();

    this.state.set(STATE_STRING, APP_STATES['dashboard']);
});

Template.main.helpers({
    getTemplate() {
        const instance = Template.instance();
        
        switch(instance.state.get(STATE_STRING)) {
            case APP_STATES['books']:
                return 'bookList';
            
            default:
                return 'notImplemented'; 
        }
    }
});

Template.main.events({
    'click .link'(e, instance) {
        e.preventDefault();

        instance.state.set(STATE_STRING, APP_STATES[e.target.dataset.route]);
    }
})