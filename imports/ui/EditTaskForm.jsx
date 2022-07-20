import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { useTracker } from 'meteor/react-meteor-data';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';

import { getDateTimeFrom } from '/imports/helpers/dateHelpers';

export default function EditTaskForm() {
  console.log('Renderizando EditTaskForm');

  const user = useTracker(() => Meteor.user());

  let taskId;
  // URL params
  let params = useParams();
  if (params) {
    console.log('Edit Task Params');
    taskId = params.taskId;
  }

  // Props from the caller
  let {
    state: { pathOrigin, task },
  } = useLocation();
  console.log(`Path Origin: ${pathOrigin}`);
  console.log(task);

  const title = task ? `Editar Tarefa: ${task.text}` : 'Incluir Tarefa';
  const status = task ? task.status : 'Registered';
  const private = task ? task.isPrivate : false;
  const dateAt = task ? getDateTimeFrom(task.createdAt) : '';
  const disableCompleted = task?.status == 'In Progress' ? false : true;

  const [nameTask, setNameTask] = useState(task?.text);
  const [descriptionTask, setDescriptionTask] = useState(task?.description);
  const [creadtedDateTask] = useState(dateAt);
  const [statusTask, setStatusTask] = useState(status);
  const [privateTask, setPrivateTask] = useState(private);

  let navigate = useNavigate();

  const handleChangeNameTask = event => {
    console.log(`handleChangeNameTask ${event.target.value}`);
    setNameTask(event.target.value);
  };

  const handleChangeDescriptionTask = event => {
    console.log(`handleChangeDescriptionTask ${event.target.value}`);
    setDescriptionTask(event.target.value);
  };

  const handleChangeStatusTask = event => {
    console.log(`handleChangeStatusTask ${event.target.value}`);
    setStatusTask(event.target.value);
  };

  const handleChangePrivateTask = event => {
    setPrivateTask(event.target.checked);
  };

  const onClickCancelButton = event => {
    console.log('EditTaskForm onClickCancelButton');
    navigate(pathOrigin);
  };

  const onClickSaveButton = event => {
    console.log('EditTaskForm onClickCancelButton');
    event.preventDefault();

    if (!nameTask) return;

    const statusAux = statusTask ? statusTask : 'Registered';
    const isPrivateAux = privateTask ? privateTask : false;

    /*
    console.log(
      `text: ${nameTask} description: ${descriptionTask} status: ${statusAux} isPrivate: ${privateTask}`
    );
     */

    // Production environment
    if (!task) {
      Meteor.call(
        'tasks.insert',
        nameTask,
        user.username,
        descriptionTask,
        statusAux,
        isPrivateAux,
        function (error) {
          if (error) {
            console.log(error);
            console.log(`Erro na inserção da tarefa: ${error}`);
          } else {
            console.log(`Tarefa  ${nameTask} incluída com sucesso!`);
          }
        }
      );
    } else {
      Meteor.call(
        'tasks.update',
        taskId,
        nameTask,
        descriptionTask,
        statusAux,
        isPrivateAux,
        function (error) {
          if (error) {
            console.log(`Erro na atualização da tarefa: ${error}`);
          } else {
            console.log(`Tarefa  ${nameTask} atualizada com sucesso!`);
          }
        }
      );
    }
    navigate(pathOrigin);
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
        <Typography
          component="h1"
          variant="h5"
          align="center"
          paddingBottom="8px"
        >
          {title}
        </Typography>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '400px' },
          }}
          maxWidth="xs"
          noValidate
          autoComplete="off"
          //onSubmit={onClickSignUp}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            sx={{ ml: 12 }}
          >
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={privateTask}
                  onChange={handleChangePrivateTask}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Private"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
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
            {taskId ? (
              <Box>
                <FormControl
                  sx={{
                    width: '400px',
                  }}
                >
                  <FormLabel id="row-radio-buttons-group-status">
                    Status
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="row-radio-buttons-group-status"
                    name="row-radio-buttons-group"
                    value={statusTask}
                    onChange={handleChangeStatusTask}
                  >
                    <FormControlLabel
                      value="Registered"
                      control={<Radio />}
                      label="Registered"
                    />
                    <FormControlLabel
                      value="In Progress"
                      control={<Radio />}
                      label="In Progress"
                    />
                    <FormControlLabel
                      disabled={disableCompleted}
                      value="Completed"
                      control={<Radio />}
                      label="Completed"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            ) : (
              ''
            )}
          </Box>
          <Box
            className="user-buttons"
            maxWidth="xs"
            sx={{ display: 'flex', justifyContent: 'center' }}
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
          </Box>
        </Box>
      </Box>
    </>
  );
}
