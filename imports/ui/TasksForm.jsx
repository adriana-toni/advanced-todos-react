import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

// Configuração de Links para as rotas
import { useNavigate } from 'react-router-dom';

import { useTracker } from 'meteor/react-meteor-data';

import { TasksCollection } from '/imports/db/TasksCollection';
import Task from '/imports/ui/Task';
import LoginForm from '/imports/ui/LoginForm';
import Loading from '/imports/ui/Loading';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function getMaxPagination(totalTasks, limitPage) {
  if (totalTasks % limitPage == 0) {
    return Math.trunc(totalTasks / limitPage);
  }
  return Math.trunc(totalTasks / limitPage + 1);
}

export default function TasksForm() {
  console.log('Renderizando TaskForm');
  const user = useTracker(() => Meteor.user());

  const [showCompleted, setShowCompleted] = useState(true);
  const hideCompletedFilter = { status: { $ne: 'Completed' } };

  const limitedTasks = 4;
  const [page, setPage] = useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const [searchTask, setSearchTask] = useState('');
  const [messageError, setMessageError] = useState('');
  const [messageSucess, setMessageSucess] = useState('');

  let navigate = useNavigate();

  const { tasks, pendingTasksCount, maxPagination, isLoading } = useTracker(
    () => {
      const noDataAvailable = {
        tasks: [],
        pendingTasksCount: 0,
        maxPagination: 1,
      };

      if (!user) {
        return noDataAvailable;
      }

      // Allows the client code to ask for data to the client.
      const publishType = 'allTasks';

      // Search task by text
      const taskSearch = searchTask
        ? //? { text: { $regex: `/${searchTask}/` } }
          { text: { $regex: `^${searchTask}.*` } }
        : {};

      // Search task by userId or isPrivate according publishType
      const userPrivateFilter =
        user && publishType != 'allTasks'
          ? { userId: user._id }
          : {
              $or: [{ userId: user._id }, { isPrivate: { $eq: false } }],
            };

      // Search task by status Registered or In Progress
      const statusFilter = showCompleted ? {} : hideCompletedFilter;

      // Ordenação
      const optionsOfOrdenation = { sort: { createdAt: -1 } };

      // Limite de Paginação
      const pageLimiter = { limit: limitedTasks };

      // Skip
      const skipLimter = { skip: (page - 1) * limitedTasks };

      const optionsFind = {
        ...optionsOfOrdenation,
        ...pageLimiter,
        ...skipLimter,
      };
      console.log('optionsFind');
      console.log(optionsFind);

      const pendingOnlyFilter = {
        ...taskSearch,
        ...statusFilter,
        ...userPrivateFilter,
      };
      const handler = Meteor.subscribe(publishType, pendingOnlyFilter);
      /*
      console.log('Subscribe');
      console.log(handler);
      */

      if (!handler.ready()) {
        // console.log('handler is not ready!');
        return { ...noDataAvailable, isLoading: true };
      }

      console.log('taskSearch');
      console.log(taskSearch);
      console.log('userPrivateFilter');
      console.log(userPrivateFilter);
      console.log('statusFilter');
      console.log(statusFilter);
      console.log(`pendingOnlyFilter`);
      console.log(pendingOnlyFilter);

      // Return data according of publishType
      const tasks = TasksCollection.find(
        pendingOnlyFilter,
        optionsFind
      ).fetch();

      const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();
      const maxPagination = Math.trunc(
        getMaxPagination(pendingTasksCount, limitedTasks)
      );

      console.log(`pendingTasksCount ${pendingTasksCount}`);
      console.log(`maxPagination ${maxPagination}`);
      console.log(`tasks`);
      console.log(tasks);

      return { tasks, pendingTasksCount, maxPagination };
    }
  );

  const onClickButtonInsert = () => {
    console.log('TaskForm onAddButtonEdit');
    navigate(`/edit`, {
      state: { pathOrigin: '/tasks', task: null },
    });
  };

  const onClickButtonEdit = task => {
    console.log('TaskForm onClickButtonEdit');
    navigate(`/edit/${task._id}`, {
      state: { pathOrigin: '/tasks', task: task },
    });
  };

  const onClickButtonDelete = task => {
    console.log('TaskForm onDeleteButtonEdit');
    console.log(task);

    setMessageError('');
    setMessageSucess('');

    Meteor.call('tasks.remove', task._id, function (error) {
      if (error) {
        console.log(`Erro na remoção da tarefa: ${error}`);
        setMessageError(`Error removing task: ${error.error}`);
      } else {
        console.log(`Tarefa  ${task.text} removida com sucesso!`);
        setMessageSucess(`Task ${task.text} successfully removed!`);
      }
    });
  };

  const handleChangeSearchTask = event => {
    console.log('TaskForm handleChangeSearchTask');
    setSearchTask(event.target.value);
  };

  const onClickShowCompleted = () => {
    console.log('onClickShowCompleted');
    setShowCompleted(!showCompleted);
  };

  return (
    <>
      <Box
        component="main"
        maxWidth="xs"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{ mt: 15, ml: 25 }}
      >
        {user ? (
          <>
            <Box>
              {isLoading && <Loading />}
              {messageError ? (
                <Alert
                  severity="error"
                  onClose={() => {
                    setMessageError('');
                  }}
                  sx={{ mb: 4 }}
                >
                  {messageError}
                </Alert>
              ) : (
                ''
              )}
              {messageSucess ? (
                <Alert
                  severity="success"
                  onClose={() => {
                    setMessageSucess('');
                  }}
                  sx={{ mb: 4 }}
                >
                  {messageSucess}
                </Alert>
              ) : (
                ''
              )}
              <Typography variant="h6" color="textPrimary" align="center">
                Tarefas Cadastradas
                <IconButton
                  aria-label="addTask"
                  onClick={onClickButtonInsert}
                  sx={{ marginLeft: '10px' }}
                >
                  <AddTaskOutlinedIcon />
                </IconButton>
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  id="standard-search"
                  label="Search task"
                  type="search"
                  variant="standard"
                  onChange={handleChangeSearchTask}
                  sx={{ width: '400px' }}
                />
              </Box>
              <FormGroup>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={showCompleted}
                        onClick={onClickShowCompleted}
                      />
                    }
                    label="Show All"
                  />
                </Box>
              </FormGroup>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
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
              </Box>
            </Box>
            <Box
              component="footer"
              maxWidth="xs"
              sx={{
                paddingTop: '10px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Stack spacing={2}>
                <Pagination
                  count={maxPagination}
                  page={page}
                  onChange={handleChangePage}
                />
              </Stack>
            </Box>
          </>
        ) : (
          <LoginForm />
        )}
      </Box>
    </>
  );
}
