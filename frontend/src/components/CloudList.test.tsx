import React from 'react';
import axios from 'axios';
import nock from 'nock';
import { sampleApiResponse } from '../utils/TestData';
import { render, waitFor, screen } from '@testing-library/react';
import { CloudList } from './CloudList';

// the CloudList component renders the DataGrid component,
//  which gives an error when rendered by react-testing-library
jest.mock('@material-ui/data-grid', () => {
  return { DataGrid: () => null };
});

describe('CloudList', () => {
  const apiBaseUrl = 'http://localhost:5000';
  const responseData = sampleApiResponse;
  const coords = {
    latitude: 123.45,
    longitude: 987.65,
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0,
  };

  beforeAll(() => {
    axios.defaults.adapter = require('axios/lib/adapters/http');
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('calls the API for the cloud data', async () => {
    const scope = nock(apiBaseUrl)
      .get('/cloudlist?lat=123.45&lon=987.65')
      .reply(200, responseData);
    render(<CloudList coords={coords} />);

    await waitFor(() => expect(scope.isDone()).toBe(true));
  });

  it('renders an error when request returns with error response code', async () => {
    const scope = nock(apiBaseUrl)
      .get('/cloudlist?lat=123.45&lon=987.65')
      .reply(500, {});
    render(<CloudList coords={coords} />);

    await waitFor(() => expect(scope.isDone()).toBe(true));

    screen.getByText(/Unable to load data/);
  });
});
