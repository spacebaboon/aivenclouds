import React from 'react';
import axios from 'axios';
import nock from 'nock';
import { sampleApiResponse } from '../utils/TestData';
import { render, waitFor } from '@testing-library/react';

import { CloudList } from './CloudList';

describe('CloudList', () => {
  beforeAll(() => {
    axios.defaults.adapter = require('axios/lib/adapters/http');
  });
  beforeEach(() => {
    nock.cleanAll();
  });
  const apiBaseUrl = 'http://localhost:5000';
  const responseData = sampleApiResponse;
  it('calls the API for the cloud data', async () => {
    const scope = nock(apiBaseUrl).get('/clouds').reply(200, responseData);
    render(<CloudList />);

    await waitFor(() => expect(scope.isDone()).toBe(true));
  });

  it('renders CloudTable with error when network call fails', () => {});
});
