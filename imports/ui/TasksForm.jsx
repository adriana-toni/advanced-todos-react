import React, { useState } from 'react';
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

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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

  const [showCompleted, setShowCompleted] = useState(true);
  const showCompletedFilter = new ReactiveVar({});

  let navigate = useNavigate();

  const onClickLogout = event => {
    console.log('Logout');
    navigate('/');
    Meteor.logout();
  };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };

    if (!user) {
      return noDataAvailable;
    }

    // Allows the client code to ask for data to the client.
    const publishType = 'allTasks';

    // Filtro de pesquisa de tarefa
    const userFilter =
      user && publishType != 'allTasks'
        ? { userId: user._id }
        : { $or: [{ userId: user._id }, { isPrivate: { $eq: false } }] };

    console.log('pendingOnlyFilter antes - showCompletedFilter');
    console.log(showCompletedFilter);
    const pendingOnlyFilter = { ...showCompletedFilter.get(), ...userFilter };

    const handler = Meteor.subscribe(publishType);
    /*
    console.log('Subscribe');
    console.log(handler);
    */

    if (!handler.ready()) {
      // console.log('handler is not ready!');
      return { ...noDataAvailable, isLoading: true };
    }

    // Return data according of publishType
    const tasks = TasksCollection.find(pendingOnlyFilter, {
      sort: { createdAt: -1 },
    }).fetch();

    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    console.log('userFilter');
    console.log(userFilter);
    console.log('showCompletedFilter');
    console.log(showCompletedFilter.get());
    console.log(`pendingOnlyFilter`);
    console.log(pendingOnlyFilter);
    console.log(`pendingTasksCount ${pendingTasksCount}`);
    console.log(`tasks`);
    console.log(tasks);

    return { tasks, pendingTasksCount };
  });

  const onAddButtonEdit = () => {
    console.log('TaskForm onAddButtonEdit');
    navigate(`/edit`);
  };

  const onClickButtonEdit = task => {
    console.log('TaskForm onClickButtonEdit');
    navigate(`/edit/${task._id}`, {
      state: { pathOrigin: '/welcome', task: task },
    });
  };

  const onClickButtonDelete = task => {
    console.log('TaskForm onDeleteButtonEdit');
    console.log(task);

    Meteor.call('tasks.remove', task._id);
  };

  const onClickShowCompleted = () => {
    console.log('onClickShowCompleted');
    setShowCompleted(!showCompleted);
    if (showCompleted) {
      showCompletedFilter.set({});
    } else {
      showCompletedFilter.set({ status: { $ne: 'Completed' } });
    }
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
                <IconButton
                  aria-label="addTask"
                  onClick={onAddButtonEdit}
                  sx={{ marginLeft: '10px' }}
                >
                  <AddTaskOutlinedIcon />
                </IconButton>
              </Typography>
              <FormGroup>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={showCompleted}
                        onClick={onClickShowCompleted}
                      />
                    }
                    label="Show Completed"
                  />
                </Box>
              </FormGroup>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 400,
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
