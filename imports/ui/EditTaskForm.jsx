import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useTracker } from 'meteor/react-meteor-data';

import { TasksCollection } from '/imports/db/TasksCollection';

import Header from './Header';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Loading from '/imports/ui/Loading';
import { getDateTimeFrom } from '/imports/helpers/dateHelpers';

export default function EditTaskForm() {
  console.log('Renderizando EditTaskForm');
  const user = useTracker(() => Meteor.user());

  let taskId;
  let params = useParams();
  if (params) {
    console.log('Edit Task Params');
    taskId = params.taskId;
  }

  const [nameTask, setNameTask] = useState('');
  const [descriptionTask, setDescriptionTask] = useState('');
  const [creadtedDateTask, setCreatedDateTask] = useState('');
  const [title, setTitle] = useState('Incluir Tarefa');

  const { task, isLoadingTask } = useTracker(() => {
    console.log('EditTaskForm - { task, isLoadingTask } = useTracker');

    const noDataAvailable = { task: {} };

    if (!user && !taskId) {
      return noDataAvailable;
    }

    // Allows the client code to ask for data to the client.
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      console.log('handler is not ready!');
      return { ...noDataAvailable, isLoadingTask: true };
    }

    const taskFilter = { _id: taskId };

    // Production environment - Chamada síncrona
    const task = TasksCollection.findOne(taskFilter, {
      sort: { createdAt: -1 },
    });
    // console.log('Tarefa recuperada');
    // console.log(task);

    return { task };
  });

  useEffect(() => {
    console.log(`inside EditTaskForm - useEffect`);

    const selectedTitle = !task
      ? 'Incluir Tarefa'
      : `Editar Tarefa: ${task.text}`;
    setTitle(selectedTitle);

    if (task) {
      setNameTask(task.text);
      setDescriptionTask(task.description);
      setCreatedDateTask(getDateTimeFrom(task.createdAt));
    }
  }, [task]);

  /*
  console.log(`title: ${title}`);
  console.log(`creadtedDate: ${creadtedDateTask}`);
  console.log(`task: ${nameTask}`);
  console.log(`description: ${descriptionTask}`);
  */

  let navigate = useNavigate();

  const handleChangeNameTask = event => {
    console.log(`handleChangeNameTask ${event.target.value}`);
    setNameTask(event.target.value);
  };

  const handleChangeDescriptionTask = event => {
    console.log(`handleChangeDescriptionTask ${event.target.value}`);
    setDescriptionTask(event.target.value);
  };

  const onClickCancelButton = event => {
    console.log('EditTaskForm onClickCancelButton');
    navigate('/tasks');
  };

  const onClickSaveButton = event => {
    console.log('EditTaskForm onClickCancelButton');
    event.preventDefault();

    if (!nameTask) return;

    // Production environment
    if (!task) {
      Meteor.call('tasks.insert', nameTask, descriptionTask);
    } else {
      Meteor.call('tasks.update', taskId, nameTask, descriptionTask);
    }
    navigate('/tasks');
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{ width: '400px' }}
        >
          {title}
        </Typography>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '400px' },
          }}
          noValidate
          autoComplete="off"
        >
          {isLoadingTask && <Loading />}
          <TextField
            required
            id="outlined-basic-text-task"
            label="Task"
            type="text"
            variant="outlined"
            value={nameTask}
            onChange={handleChangeNameTask}
            fullWidth
          />
          <TextField
            required
            id="outlined-basic-description-task"
            label="Description"
            type="text"
            variant="outlined"
            value={descriptionTask}
            onChange={handleChangeDescriptionTask}
            fullWidth
          />
          <TextField
            id="outlined-createdAt-disable-input"
            label="Date"
            defaultValue={creadtedDateTask}
            disabled
            fullWidth
          />
          <Container
            className="user-buttons"
            maxWidth="xs"
            sx={{ display: 'flex', justifyContent: 'center', width: '400px' }}
          >
            <Button
              type="button"
              variant="contained"
              onClick={onClickCancelButton}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={onClickSaveButton}
            >
              Save
            </Button>
          </Container>
        </Box>
      </Container>
    </>
  );
}
