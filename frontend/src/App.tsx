import React from 'react';
import { Container } from '@material-ui/core';
import { CloudList } from './components/CloudList';
import Geolocation from './components/Geolocation';
import './App.css';

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
