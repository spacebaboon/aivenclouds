import { DataGrid, RowsProp } from '@material-ui/data-grid';

import React from 'react';

type TableProps = {
  data: RowsProp;

  isLoading: boolean;
  error?: boolean;
};

export const CloudTable = ({ data, isLoading, error = false }: TableProps) => {
  const columns = [
    { field: 'description', headerName: 'Name', width: 400 },
    { field: 'region', headerName: 'Region', width: 100 },
    { field: 'provider', headerName: 'Provider', width: 200 },
    { field: 'distance', headerName: 'Distance', type: 'number', width: 150 },
  ];

  return isLoading ? (
    <h2>Loading...</h2>
  ) : error ? (
    <h2>Unable to load data</h2>
  ) : (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={data} columns={columns} pageSize={50} />
    </div>
  );
};
