import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';

// Configuração de Links para as rotas
import { Outlet } from 'react-router-dom';

// Telas da aplicação
import LoginForm from '/imports/ui/LoginForm';
import Header from './Header';
import { TasksForm } from './TasksForm';

/* Antes - sem rotas
export const App = () => {
  return (
    <>
      <Container maxWidth="md">
        <header>
          <div className="app-bar">
            <div className="app-title">
              <h1>📝️ Meteor Advanced To-Do List with React!</h1>
            </div>
          </div>
        </header>
      </Container>
      <Outlet />
    </>
  );
};
*/

/* Depois - com Rotas */
export default function App() {
  const user = useTracker(() => Meteor.user());
  console.log('App');
  console.log(user);

  return (
    <>
      <Header>📝️ Meteor Advanced To-Do List with React!</Header>
      {user ? (
        <>
          <TasksForm />
        </>
      ) : (
        <>
          <LoginForm />
        </>
      )}
      <Outlet />
    </>
  );
}
