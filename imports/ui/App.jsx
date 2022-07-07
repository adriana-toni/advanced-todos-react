import React from 'react';

// Configuração de Links para as rotas
import { Outlet } from 'react-router-dom';

// Estilização
import Container from '@material-ui/core/Container';

import LoginForm from '/imports/ui/LoginForm';
import Header from './Header';

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
  return (
    <>
      <Header>📝️ Meteor Advanced To-Do List with React!</Header>
      <Container>
        <LoginForm />
      </Container>
      <Outlet />
    </>
  );
}
