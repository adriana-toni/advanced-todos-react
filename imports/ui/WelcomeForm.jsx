import React from 'react';

// Configuração de Links para as rotas
import { useNavigate } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { TasksCollection } from '/imports/db/TasksCollection';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';

// Utilities
import Header from './Header';

const drawerWidth = 200;

export default function WelcomeForm() {
  const user = useTracker(() => Meteor.user());
  console.log(user);

  let navigate = useNavigate();

  const onClickHome = () => {
    Meteor.logout();
    navigate('/');
  };

  const onClickViewTasks = () => {
    navigate('/tasks', { state: { pathOrigin: '/welcome' } });
  };

  const {
    registeredTasksCount,
    inProgressTasksCount,
    completedTasksCount,
    isLoading,
  } = useTracker(() => {
    const noDataAvailable = {
      registeredTasksCount: 0,
      inProgressTasksCount: 0,
      completedTasksCount: 0,
    };

    const publishType = 'allTasksWithClientFilter';

    const userFilter =
      user && publishType != 'allTasksWithClientFilter'
        ? { userId: user._id }
        : { $or: [{ userId: user._id }, { isPrivate: { $eq: false } }] };

    // Filtro de pesquisa de tarefa
    const registeredFilter = { ...{ status: 'Registered' }, ...userFilter };
    const inProgressFilter = { ...{ status: 'In Progress' }, ...userFilter };
    const completedFilter = { ...{ status: 'Completed' }, ...userFilter };

    const handler = Meteor.subscribe(publishType);

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const registeredTasksCount = TasksCollection.find(registeredFilter).count();
    const inProgressTasksCount = TasksCollection.find(inProgressFilter).count();
    const completedTasksCount = TasksCollection.find(completedFilter).count();

    console.log(`registeredTasksCount: ${registeredTasksCount}`);
    console.log(`inProgressTasksCount: ${inProgressTasksCount}`);
    console.log(`completedTasksCount: ${completedTasksCount}`);

    return {
      registeredTasksCount,
      inProgressTasksCount,
      completedTasksCount,
    };
  });

  return (
    <Box
      component="main"
      display="flex"
      justifyContent="center"
      sx={{ mt: 15, ml: 25 }}
    >
      <Grid
        container
        direction="row"
        rowSpacing={4}
        maxWidth={550}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid item xs={12} sm={6}>
          <Card variant="elevation" elevation={10} sx={{ maxWidth: 250 }}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                align="center"
              >
                Tasks Registered
              </Typography>
              <Typography
                sx={{ mb: 1.5 }}
                color="text.secondary"
                align="center"
              >
                {registeredTasksCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            variant="elevation"
            elevation={10}
            sx={{ maxWidth: 250, maxHeight: 115 }}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                align="center"
              >
                Tasks In Progress
              </Typography>
              <Typography
                sx={{ mb: 1.5 }}
                color="text.secondary"
                align="center"
              >
                {inProgressTasksCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            variant="elevation"
            elevation={10}
            sx={{ maxWidth: 250, maxHeight: 115 }}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                align="center"
              >
                Tasks Completed
              </Typography>
              <Typography
                sx={{ mb: 1.5 }}
                color="text.secondary"
                align="center"
              >
                {completedTasksCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            variant="elevation"
            elevation={10}
            sx={{ maxWidth: 250, maxHeight: 115 }}
          >
            <CardContent>
              <CardActionArea onClick={onClickViewTasks}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="center"
                >
                  Views Tasks
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  &nbsp;
                </Typography>
              </CardActionArea>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
