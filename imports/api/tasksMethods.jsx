import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.methods({
  'tasks.insert'(text, description) {
    console.log(`inside method: tasks.insert ${this.userId}`);

    check(text, String);
    check(description, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.insert({
      text: text,
      description: description,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  'tasks.remove'(taskId) {
    console.log('inside method: tasks.remove');
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // Check if the user that is authenticated is the same user that created the tasks.
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }
    TasksCollection.remove(taskId);
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    console.log('inside method: tasks.setIsChecked');
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // Check if the user that is authenticated is the same user that created the tasks.
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});
