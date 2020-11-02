import React from 'react';
import { CloudTable } from './CloudTable';
import { render, screen } from '@testing-library/react';
import { Row } from './CloudList';
import { sampleApiResponse } from '../utils/TestData';

describe('Cloud Table', () => {
  it('renders the table with headers for name, region and distance', () => {
    const data: Row[] = [];
    render(<CloudTable data={data} isLoading={false} />);

    screen.getByRole('columnheader', { name: /Name/ });
    screen.getByRole('columnheader', { name: /Region/ });
    screen.getByRole('columnheader', { name: /Provider/ });
    screen.getByRole('columnheader', { name: /Distance/ });

    expect(screen.getAllByRole('row').length).toEqual(1);
  });

  it('renders a row for each item in data prop', () => {
    const data: Row[] = sampleApiResponse.clouds;
    render(<CloudTable data={data} isLoading={false} />);

    screen.getByText(/Total Rows: 3/);
  });

  it('shows a loading message while data is loading', () => {
    render(<CloudTable data={[]} isLoading={true} />);

    // have you seen this? so cool!
    // screen.logTestingPlaygroundURL();
    // https://twitter.com/kentcdodds/status/1316044932327469056

    screen.getByText('Loading...');
  });

  it('hides loading message when not loading', () => {
    render(<CloudTable data={[]} isLoading={false} />);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('shows a error message when the error prop is passed', () => {
    render(<CloudTable data={[]} isLoading={false} error={true} />);
    screen.getByText('Unable to load data');
  });
});
