import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'accounts.findUserByUsername'(username) {
    // console.log('inside server method: accounts.findUserByUsername');
    return Accounts.findUserByUsername(username);
  },

  'accounts.createUser'(newUser) {
    // console.log('inside server method: accounts.createUser');
    Accounts.createUser(newUser);
  },

  'accounts.updateUser'(userId, updateProfile) {
    // console.log('inside server method: accounts.updateUser');
    Meteor.users.update(userId, {
      $set: {
        profile: updateProfile,
      },
    });
  },
});
