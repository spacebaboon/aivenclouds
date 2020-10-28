import { Container } from '@material-ui/core';
import React from 'react';
import './App.css';
import { CloudTable } from './components/CloudTable';

function App() {
  return (
    <div className="App">
      <h1>Aiven Clouds</h1>
      <Container maxWidth="sm">
        <CloudTable rows={[]} />
      </Container>
    </div>
  );
}

export default App;
