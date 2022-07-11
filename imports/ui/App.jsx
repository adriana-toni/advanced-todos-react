import React from 'react';

import { useTracker } from 'meteor/react-meteor-data';

// Configuração de Links para as rotas
import { Outlet } from 'react-router-dom';

// Telas da aplicação
import LoginForm from '/imports/ui/LoginForm';
import Header from './Header';

export default function App() {
  console.log('Formulário Principal - App');
  const user = useTracker(() => Meteor.user());
  if (user) {
    console.log('Usuário obtido no Formulário Principal - App');
    console.log(user.username);
  }

  return (
    <>
      <Header>📝️ Meteor Advanced To-Do List with React!</Header>
      <LoginForm />
      <Outlet />
    </>
  );
}
