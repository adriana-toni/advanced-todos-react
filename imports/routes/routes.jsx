import React from 'react';
import { render } from 'react-dom';

// Configuração de rotas no React Router v6
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from '../ui/App';
import { TasksForm } from '../ui/TasksForm';
import UserForm from '../ui/UserForm';

Meteor.startup(() => {
  console.log('startup Lado Cliente');
  /* render(<App />, document.getElementById('react-target')); */
  render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="tasks" element={<TasksForm />} />
        </Route>
        <Route path="user" element={<UserForm />} />
      </Routes>
    </Router>,
    document.getElementById('react-target')
  );
});
