import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.publish('tasks', function publishTasks() {
  // Retorna somente as tasks incluídas pelo usuário logado
  return TasksCollection.find({ userId: this.userId });
});

Meteor.publish('allTasks', function publishAllTasks() {
  // Retorna todas as tasks cadastradas independente do usuário
  return TasksCollection.find();
});
