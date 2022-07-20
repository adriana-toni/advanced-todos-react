import React from 'react';

// Estilização
import Container from '@material-ui/core/Container';

export default function Header({ children: title }) {
  return (
    <Container maxWidth="md">
      <header>
        <div className="app-bar">
          <div className="app-title">
            <h1>{title}</h1>
          </div>
        </div>
      </header>
    </Container>
  );
}
