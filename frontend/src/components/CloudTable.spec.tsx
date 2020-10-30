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
    screen.getByRole('columnheader', { name: /Distance/ });

    expect(screen.getAllByRole('row').length).toEqual(1);
  });

  it('renders a row for each item in data prop', () => {
    const data: Row[] = sampleApiResponse.clouds;
    render(<CloudTable data={data} isLoading={false} />);

    // have you seen this? so cool!
    // screen.logTestingPlaygroundURL();

    expect(screen.getAllByRole('row').length).toEqual(4);
    screen.getByRole('row', {
      name: /Google Cloud: Osaka east asia 8811/,
    });
    screen.getByRole('row', {
      name: /Amazon Web Services: Frankfurt europe 479/,
    });
    screen.getByRole('row', {
      name: /Azure: West Central US north america 7960/,
    });
  });

  it('shows a loading message while data is loading', () => {
    render(<CloudTable data={[]} isLoading={true} />);
    screen.getByText('Loading...');
  });

  it('hides loading message when not loading', () => {
    render(<CloudTable data={[]} isLoading={false} />);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
