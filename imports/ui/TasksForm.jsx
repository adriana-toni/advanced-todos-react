import React from 'react';
import { Meteor } from 'meteor/meteor';

// Configuração de Links para as rotas
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { useTracker } from 'meteor/react-meteor-data';

import { TasksCollection } from '/imports/db/TasksCollection';
import Task from '/imports/ui/Task';
import EditTaskForm from '/imports/ui/EditTaskForm';
import LoginForm from '/imports/ui/LoginForm';
import Loading from '/imports/ui/Loading';

import Header from './Header';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Container from '@mui/material/Container';

function Welcome({ sx, children: username }) {
  /* console.log('Welcome'); */
  return (
    <Typography variant="h5" color="textSecondary" align="justify" {...sx}>
      Hi {username}, welcome to the ToDo List!
    </Typography>
  );
}

export default function TasksForm() {
  console.log('Renderizando TaskForm');
  const user = useTracker(() => Meteor.user());

  /*
  if (user) {
    console.log('TaskForm: User ');
    console.log(user);
  }
  */

  let navigate = useNavigate();

  const onClickLogout = event => {
    console.log('Logout');
    navigate('/');
    Meteor.logout();
  };

  // Filtro de pesquisa de tarefa
  const userFilter = user ? { userId: user._id } : {};

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };

    if (!user) {
      return noDataAvailable;
    }

    // Allows the client code to ask for data to the client.
    const handler = Meteor.subscribe('tasks');
    /*
    console.log('Subscribe');
    console.log(handler);
    */

    if (!handler.ready()) {
      // console.log('handler is not ready!');
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(userFilter, {
      sort: { createdAt: -1 },
    }).fetch();

    const pendingTasksCount = TasksCollection.find(userFilter).count();
    /*
    console.log(`userFilter`);
    console.log(userFilter);
    console.log(`pendingTasksCount ${pendingTasksCount}`);
    console.log(`tasks`);
    console.log(tasks);
    */
    return { tasks, pendingTasksCount };
  });

  const onClickButtonEdit = task => {
    console.log('TaskForm onClickButtonEdit');
    //console.log(task);
    navigate(`/tasks/edit/${task._id}`);
  };

  const onClickButtonDelete = task => {
    console.log('TaskForm onDeleteButtonEdit');
    console.log(task);

    Meteor.call('tasks.remove', task._id);
  };

  return (
    <>
      <Header>📝️ Meteor Advanced To-Do List with React!</Header>
      <Container component="main" maxWidth="xs">
        {user ? (
          pendingTasksCount != 0 ? (
            <>
              {isLoading && <Loading />}
              <Typography variant="h6" color="textPrimary" align="center">
                Tarefas Cadastradas
              </Typography>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                }}
              >
                {tasks.map(task => (
                  <Task
                    key={task._id}
                    task={task}
                    user={user}
                    onEditClick={onClickButtonEdit}
                    onDeleteClick={onClickButtonDelete}
                  />
                ))}
              </List>
            </>
          ) : (
            <EditTaskForm />
          )
        ) : (
          <LoginForm />
        )}
      </Container>
      <Outlet />
    </>
  );
}
