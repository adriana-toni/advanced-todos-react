import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

// Configuração de Links para as rotas
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { useTracker } from 'meteor/react-meteor-data';

import Header from './Header';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

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
  if (user) {
    console.log(user);
  }

  let navigate = useNavigate();

  const onClickLogout = event => {
    console.log('Logout');
    navigate('/');
    Meteor.logout();
  };

  return (
    <>
      <Header>📝️ Meteor Advanced To-Do List with React!</Header>
      <Container maxWidth="sm" style={{ display: 'flex' }}>
        <Container component="task-bar" style={{ width: '35%' }}>
          <Grid
            container
            direction="row"
            alignItems="center"
            sx={{ paddingTop: 5 }}
          >
            <Grid item>
              <HomeOutlinedIcon sx={{ fontSize: 50 }} />
            </Grid>
            <Grid item>
              <Typography align="center" variant="h5">
                Home
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            sx={{ paddingTop: 5 }}
          >
            <Grid item>
              <AccountCircleOutlinedIcon sx={{ fontSize: 50 }} />
            </Grid>
            <Grid item>
              <Typography align="center" variant="h5">
                Perfil
              </Typography>
            </Grid>
          </Grid>
        </Container>
        <Container component="tasks-main" style={{ width: '65%' }}>
          <Welcome sx={{ mt: 8, mb: 4 }}>{user.username}</Welcome>
          <Outlet />
        </Container>
      </Container>
    </>
  );
}
