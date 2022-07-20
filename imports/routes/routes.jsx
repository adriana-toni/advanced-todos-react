import React from 'react';
import { render } from 'react-dom';

import { Meteor } from 'meteor/meteor';

// Configuração de rotas no React Router v6
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from '../ui/App';

import Header from '../ui/Header';
import NavBar from '../ui/NavBar';

import UserForm from '../ui/UserForm';
import WelcomeForm from '../ui/WelcomeForm';
import TasksForm from '../ui/TasksForm';
import EditTaskForm from '../ui/EditTaskForm';
import ResetPasswordForm from '../ui/ResetPasswordForm';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

Meteor.startup(() => {
  console.log('startup Lado Cliente');
  console.log(this.user);

  const drawerWidth = this.user ? 100 : 0;
  console.log(`drawerWidth ${drawerWidth}`);

  render(
    <Router>
      <Box style={{ display: 'flex', flexDirection: 'column' }}>
        <AppBar
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Header>📝️ Meteor Advanced To-Do List with React!</Header>
        </AppBar>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
        >
          <NavBar />
        </Box>
        <Box
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="user" element={<UserForm />} />
            <Route path="welcome" element={<WelcomeForm />} />
            <Route path="tasks" element={<TasksForm />} />
            <Route path="edit" element={<EditTaskForm />}>
              <Route path=":taskId" element={<EditTaskForm />} />
            </Route>
            <Route path="reset" element={<ResetPasswordForm />} />
          </Routes>
        </Box>
      </Box>
    </Router>,
    document.getElementById('react-target')
  );
});
