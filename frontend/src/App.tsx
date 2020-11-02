import { Container } from '@material-ui/core';
import React from 'react';
import { CloudList } from './components/CloudList';
import './App.css';
import Geolocation from './components/Geolocation';

function App() {
  return (
    <div className="App">
      <h1>Aiven Clouds</h1>
      <Container maxWidth="md">
        <Geolocation>
          <CloudList />
        </Geolocation>
      </Container>
    </div>
  );
}

export default App;
