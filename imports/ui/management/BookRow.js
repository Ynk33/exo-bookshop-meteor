import { Template } from 'meteor/templating';

import './BookRow.html';

Template.bookRow.helpers({
    joinedAuthors() {
        return this.authors.map(author => author.firstName + ' ' + author.lastName).join(', ');
    }
})