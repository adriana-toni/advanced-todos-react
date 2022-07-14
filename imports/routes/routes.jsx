import React from 'react';
import { render } from 'react-dom';

// Configuração de rotas no React Router v6
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from '../ui/App';

import TasksForm from '../ui/TasksForm';
import UserForm from '../ui/UserForm';
import EditTaskForm from '../ui/EditTaskForm';

Meteor.startup(() => {
  console.log('startup Lado Cliente');
  /* render(<App />, document.getElementById('react-target')); */

  render(
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="user" element={<UserForm />} />
        <Route path="tasks" element={<TasksForm />} />
        <Route path="edit" element={<EditTaskForm />}>
          <Route path=":taskId" element={<EditTaskForm />} />
        </Route>
      </Routes>
    </Router>,
    document.getElementById('react-target')
  );
});
