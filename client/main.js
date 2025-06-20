import { Template } from 'meteor/templating';

import '../imports/ui/App';

Template.registerHelper('not', a => {
    return !a;
});
