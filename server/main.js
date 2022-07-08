import { Meteor } from 'meteor/meteor';
import '/imports/api/UserMethods';

Meteor.startup(() => {
  console.log('startup Lado Servidor');
});
