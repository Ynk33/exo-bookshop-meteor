import { Meteor } from 'meteor/meteor';
import { seeder } from '../imports/db/seeders/DBSeeder';

import '../imports/api/BooksPublication';
import '../imports/api/SalesPerGenrePublication';

const SEEDING = false;

Meteor.startup(() => {
  // SEEDING
  if (SEEDING) {
    seeder();
  }
});
