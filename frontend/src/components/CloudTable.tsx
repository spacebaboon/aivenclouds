import { DataGrid, RowsProp } from '@material-ui/data-grid';

import React from 'react';
import { Row } from './CloudList';

type TableProps = {
  data: RowsProp;
  // data: Row[];
  isLoading: boolean;
  error?: string | null;
};

export const CloudTable = ({ data, isLoading, error }: TableProps) => {
  const columns = [
    { field: 'description', headerName: 'Name', width: 500 },
    { field: 'region', headerName: 'Region', width: 200 },
    { field: 'distance', headerName: 'Distance', type: 'number', width: 150 },
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={data} columns={columns} pageSize={50} />
    </div>
  );

  // return (
  //   <TableContainer component={Paper}>
  //     <Table stickyHeader aria-label="simple table">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell>
  //             <TableSortLabel>Name</TableSortLabel>
  //           </TableCell>
  //           <TableCell>
  //             <TableSortLabel>Region</TableSortLabel>
  //           </TableCell>
  //           <TableCell>
  //             <TableSortLabel>Distance</TableSortLabel>
  //           </TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {isLoading ? (
  //           <TableRow>
  //             <TableCell>Loading...</TableCell>
  //           </TableRow>
  //         ) : error ? (
  //           <TableRow>
  //             <TableCell>Unable to load data</TableCell>
  //           </TableRow>
  //         ) : (
  //           data.map((row) => (
  //             <TableRow key={row.name}>
  //               <TableCell>{row.description}</TableCell>
  //               <TableCell>{row.region}</TableCell>
  //               <TableCell>{row.distance}</TableCell>
  //             </TableRow>
  //           ))
  //         )}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // );
};
