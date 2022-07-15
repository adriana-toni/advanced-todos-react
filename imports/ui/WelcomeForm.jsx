import React from 'react';

// Configuração de Links para as rotas
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { TasksCollection } from '/imports/db/TasksCollection';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// Utilities
import Header from './Header';
import { maxHeight } from '@mui/system';

const drawerWidth = 200;

function UserData({ sx, user }) {
  /* console.log('Welcome'); */
  return (
    <Typography variant="h5" color="textSecondary" align="center" {...sx}>
      <Container fullWidth>Hi {user.username}!</Container>
    </Typography>
  );
}

export default function WelcomeForm() {
  const user = useTracker(() => Meteor.user());
  console.log(user);

  let navigate = useNavigate();

  const onClickHome = () => {
    Meteor.logout();
    navigate('/');
  };

  const onClickPerfil = () => {
    navigate('/user', { state: { pathOrigin: '/welcome', user: user } });
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

    const publishType = 'allTasks';

    const userFilter =
      user && publishType != 'allTasks'
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <Header>📝️ Meteor Advanced To-Do List with React!</Header>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <UserData sx={{ mt: 8, mb: 4 }} user={user} />
        </Toolbar>
        <List>
          <ListItem key="Home" disablePadding>
            <ListItemButton onClick={onClickHome}>
              <ListItemIcon>
                <HomeOutlinedIcon sx={{ fontSize: 56 }} />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ paddingLeft: 2 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key="Perfil" disablePadding>
            <ListItemButton onClick={onClickPerfil}>
              <ListItemIcon>
                {user.profile.photouser ? (
                  <Avatar
                    alt="Foto do perfil do usuário"
                    src={user.profile.photouser}
                    sx={{ width: 56, height: 56 }}
                  />
                ) : (
                  <AccountCircleOutlinedIcon sx={{ fontSize: 56 }} />
                )}
              </ListItemIcon>
              <ListItemText primary="Perfil" sx={{ paddingLeft: 2 }} />
            </ListItemButton>
          </ListItem>
          ))
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar sx={{ paddingTop: 20 }} />
        <Container sx={{ maxWidth: 60 }}>
          <Card variant="elevation" elevation="10" sx={{ maxWidth: 250 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tasks Registered
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {registeredTasksCount}
              </Typography>
            </CardContent>
          </Card>
          <Card
            variant="elevation"
            elevation="10"
            sx={{ maxWidth: 250, maxHeight: 115, maxHeight: 115 }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tasks In Progress
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {inProgressTasksCount}
              </Typography>
            </CardContent>
          </Card>
          <Card
            variant="elevation"
            elevation="10"
            sx={{ maxWidth: 250, maxHeight: 115 }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tasks Completed
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {completedTasksCount}
              </Typography>
            </CardContent>
          </Card>
          <Card
            variant="elevation"
            elevation="10"
            sx={{ maxWidth: 250, maxHeight: 115 }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Views Tasks
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                &nbsp;
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}
