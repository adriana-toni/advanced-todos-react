import { Meteor } from 'meteor/meteor';

import '/imports/api/UserMethods';

import '/imports/db/TasksCollection';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

Meteor.startup(() => {
  console.log('startup Lado Servidor');
});
