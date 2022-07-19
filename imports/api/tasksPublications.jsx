import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.publish('tasks', function publishTasks() {
  // Retorna somente as tasks incluídas pelo usuário logado
  return TasksCollection.find({ userId: this.userId });
});

Meteor.publish('allTasks', function publishAllTasks(filter) {
  // Retorna todas as tasks cadastradas independente do usuário, realizando o filtro do
  // lado do servidor
  return TasksCollection.find(filter);
});

Meteor.publish('allTasksWithClientFilter', function publishAllTasks() {
  // Retorna todas as tasks cadastradas independente do usuário, realizando o filtro do
  // lado do cliente
  return TasksCollection.find();
});
