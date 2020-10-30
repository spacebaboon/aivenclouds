import { Container } from '@material-ui/core';
import React from 'react';
import { CloudList } from './components/CloudList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Aiven Clouds</h1>
      <Container maxWidth="md">
        <CloudList />
      </Container>
    </div>
  );
}

export default App;
