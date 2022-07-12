import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function EditTaskForm() {
  console.log('Renderizando EditTaskForm');

  // const title = children ? `Editar Tarefa: ${children}` : 'Incluir Tarefa';
  const title = 'Incluir Tarefa';
  const createdDate = '';

  const [nameTask, setNameTask] = useState('');
  const [descriptionTask, setDescriptionTask] = useState('');

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

  const onClickSave = event => {
    console.log('EditTaskForm onClickCancelButton');
    event.preventDefault();

    if (!nameTask) return;

    // Production environment
    Meteor.call('tasks.insert', nameTask, descriptionTask);

    navigate('/tasks');
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5" align="center">
          {title}
        </Typography>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '396px' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={onClickSave}
        >
          <TextField
            required
            id="outlined-basic-task"
            label="Task"
            type="text"
            variant="outlined"
            value={nameTask}
            onChange={handleChangeNameTask}
          />
          <TextField
            required
            id="outlined-basic-task"
            label="Description"
            type="text"
            variant="outlined"
            value={descriptionTask}
            onChange={handleChangeDescriptionTask}
          />
          <TextField
            id="outlined-createdAt-disable-input"
            label="Date"
            defaultValue={createdDate}
            disabled
          />
          <Container className="user-buttons">
            <Button
              type="button"
              variant="contained"
              onClick={onClickCancelButton}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Container>
        </Box>
      </Container>
    </>
  );
}
