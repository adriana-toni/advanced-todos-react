import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

export default function WelcomeForm() {
  console.log('Renderizando WelcomeForm');

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header>📝️ Meteor Advanced To-Do List with React!</Header>
      <Outlet />
    </>
  );
}
