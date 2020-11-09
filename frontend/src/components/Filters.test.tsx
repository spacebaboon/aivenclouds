import { render, screen } from '@testing-library/react';
import React from 'react';
import { TableProps } from './CloudTable';
import { Filters, FiltersPropsType } from './Filters';

const MockChild = (props: TableProps) => (
  <div data-testid="child">
    Child data props: {JSON.stringify(props)}
    {props.data?.map((dataRow, index) => (
      <div key={index}>
        Row {index}: {dataRow.description}
      </div>
    ))}
  </div>
);

describe('Filters', () => {
  const tableProps: TableProps = {
    isLoading: false,
    error: false,
  };
  const filtersProps: FiltersPropsType = {
    filterRanges: [
      {
        displayName: 'Provider',
        values: ['Amazon Web Services', 'Google Cloud', 'Microsoft Azure'],
      },
      { displayName: 'Region', values: ['Europe', 'Southeast Asia'] },
    ],
    data: [
      {
        id: 'row1',
        description: 'AWS Wales',
        region: 'Europe',
        provider: 'Amazon Web Services',
        distance: 1000,
      },
      {
        id: 'row2',
        description: 'Azure Bangkok',
        region: 'Southeast Asia',
        provider: 'Microsoft Azure',
        distance: 10000,
      },
    ],
  };

  it('renders a filter section', () => {
    render(<Filters {...filtersProps} />);
    screen.getByText('Filters');
  });

  it('passes props through to child, but not filters', () => {
    render(
      <Filters {...filtersProps}>
        <MockChild {...tableProps} />
      </Filters>
    );
    screen.getByText(/Child data props:.*"isLoading":false/);
    screen.getByText(/Child data props:.*"data":/);
    expect(
      screen.queryByText(/Child data props:.*:filterRanges":/)
    ).not.toBeInTheDocument();
    screen.getByText(/Row 0: AWS Wales/);
    screen.getByText(/Row 1: Azure Bangkok/);
  });

  it('renders a heading for each filter', () => {
    render(<Filters {...filtersProps} />);
    screen.getByRole('heading', {
      name: /Provider/,
    });
    screen.getByRole('heading', {
      name: /Region/,
    });
  });

  it('renders a checkbox for each value within a filter', () => {
    render(<Filters {...filtersProps} />);
    screen.getByRole('checkbox', { name: 'Amazon Web Services' });
    screen.getByRole('checkbox', { name: 'Google Cloud' });
    screen.getByRole('checkbox', { name: 'Microsoft Azure' });

    screen.getByRole('checkbox', { name: 'Europe' });
    screen.getByRole('checkbox', { name: 'Southeast Asia' });

    // screen.logTestingPlaygroundURL();
  });

  it('filters the region data when one region checkbox clicked', () => {
    render(
      <Filters {...filtersProps}>
        <MockChild {...tableProps} />
      </Filters>
    );
    screen.getByRole('checkbox', { name: 'Microsoft Azure' }).click();
    screen.getByText(/Azure Bangkok/);
    expect(screen.getByText(/AWS Wales/)).not.toBeInTheDocument();
  });
});
