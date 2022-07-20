import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';

// Telas da aplicação
import LoginForm from '/imports/ui/LoginForm';

export default function App() {
  console.log('Formulário Principal - App');
  const user = useTracker(() => Meteor.user());
  if (user) {
    console.log('Usuário obtido no Formulário Principal - App');
    console.log(user.username);
  }

  return (
    <>
      <LoginForm />
    </>
  );
}
