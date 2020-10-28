import React from 'react';
import { CloudTable, Row } from './CloudTable';
import { render, screen } from '@testing-library/react';

describe('Cloud Table', () => {
  it('renders the table with headers for name, region and distance', () => {
    const data: Row[] = [];
    render(<CloudTable rows={data} />);

    expect(
      screen.getByRole('columnheader', { name: /Name/ })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('columnheader', { name: /Region/ })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('columnheader', { name: /Distance/ })
    ).toBeInTheDocument();

    expect(screen.getAllByRole('row').length).toEqual(1);
  });

  it('renders a row for each item in data prop', () => {
    const data: Row[] = [
      { name: 'Google Cloud: Osaka', region: 'east asia', distance: 8811 },
      {
        name: 'Amazon Web Services: Frankfurt',
        region: 'europe',
        distance: 479,
      },
      {
        name: 'Azure: West Central US',
        region: 'north america',
        distance: 7960,
      },
    ];
    render(<CloudTable rows={data} />);

    // have you seen this? seriously cool!
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
});
