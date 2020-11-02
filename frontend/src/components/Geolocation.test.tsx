import { render, screen } from '@testing-library/react';
import React from 'react';
import { Geolocation } from './Geolocation';

describe('Geolocation', () => {
  it('shows message when geolocation not supported in browser', () => {
    render(
      <Geolocation isGeolocationAvailable={false}>
        <h2>Testing</h2>
      </Geolocation>
    );

    screen.getByText(/Browser does not support Geolocation/);
  });
  it('shows message when geolocation not permitted by user', () => {
    render(
      <Geolocation isGeolocationAvailable={true} isGeolocationEnabled={false}>
        <h2>Testing</h2>
      </Geolocation>
    );

    screen.getByText(/Geolocation not enabled in browser/);
  });
  
  it('shows message when waiting for user geolocation permission', () => {
    render(
      <Geolocation
        isGeolocationAvailable={true}
        isGeolocationEnabled={true}
        coords={undefined}
      >
        <h2>Testing</h2>
      </Geolocation>
    );

    screen.getByText(/Awaiting geolocation permission.../);
  });

  it('renders child component with coords as added prop', () => {
    const TestChildComponent = (props: any) => {
      return (
        <div>
          Latitude: {props.coords.latitude}, Longitude: {props.coords.longitude}
        </div>
      );
    };
    render(
      <Geolocation
        isGeolocationAvailable={true}
        isGeolocationEnabled={true}
        coords={{
          latitude: 123.45,
          longitude: 987.65,
          accuracy: 0,
          altitude: 0,
          altitudeAccuracy: 0,
          heading: 0,
          speed: 0,
        }}
      >
        <TestChildComponent />
      </Geolocation>
    );

    screen.getByText(/Latitude: 123.45, Longitude: 987.65/);
  });
});
