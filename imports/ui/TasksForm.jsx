import React from 'react';
import { Meteor } from 'meteor/meteor';

// Configuração de Links para as rotas
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

import { TasksCollection } from '/imports/db/TasksCollection';

import Header from './Header';

import Typography from '@mui/material/Typography';

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

  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }

    return TasksCollection.find({
      sort: { createdAt: -1 },
    }).fetch();
  });

  return (
    <>
      <Header>📝️ Meteor Advanced To-Do List with React!</Header>
    </>
  );
}
