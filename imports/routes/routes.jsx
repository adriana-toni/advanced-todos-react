import React from 'react';
import { render } from 'react-dom';

// Configuração de rotas no React Router v6
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from '../ui/App';
import TasksForm from '../ui/TasksForm';
import UserForm from '../ui/UserForm';
import EditTaskForm from '../ui/EditTaskForm';
import WelcomeForm from '../ui/WelcomeForm';
import Task from '../ui/Task';

Meteor.startup(() => {
  console.log('startup Lado Cliente');
  /* render(<App />, document.getElementById('react-target')); */

  render(
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="welcome" element={<WelcomeForm />} />
        <Route path="tasks" element={<TasksForm />}>
          <Route path="edit" element={<EditTaskForm />}>
            <Route path=":taskId" element={<EditTaskForm />} />
          </Route>
          <Route path="task" element={<Task />} />
        </Route>
        <Route path="user" element={<UserForm />} />
      </Routes>
    </Router>,
    document.getElementById('react-target')
  );
});
