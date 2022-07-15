import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.methods({
  'tasks.insert'(text, description, status, isPrivate) {
    console.log(`inside method: tasks.insert ${this.userId}`);
    console.log(
      `text: ${text} description: ${description} status: ${status} isPrivate: ${isPrivate}`
    );

    check(text, String);
    check(description, String);
    check(status, String);
    check(isPrivate, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.insert({
      text: text,
      description: description,
      status: status,
      isPrivate: isPrivate,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  'tasks.update'(taskId, text, description, status, isPrivate) {
    console.log(`inside method: tasks.update ${this.userId}`);
    console.log(
      `taskId: ${taskId} text: ${text} description: ${description} status: ${status} isPrivate: ${isPrivate}`
    );

    check(taskId, String);
    check(text, String);
    check(description, String);
    check(status, String);
    check(isPrivate, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // Check if the user that is authenticated is the same user that created the tasks.
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    if (task) {
      if (status == 'Completed' && task.status != 'In Progress') {
        status = task.status;
      }
    }

    TasksCollection.update(
      { _id: taskId },
      {
        $set: {
          text: text,
          description: description,
          status: status,
          isPrivate: isPrivate,
        },
      }
    );
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
