import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'accounts.findUserByUsername'(username) {
    console.log('inside server method: accounts.findUserByUsername');
    return Accounts.findUserByUsername(username);
  },

  'accounts.createUser'(options) {
    // console.log('inside server method: accounts.createUser');
    // console.log(`username: ${username} password: ${password}`);
    Accounts.createUser(options);
  },
});
