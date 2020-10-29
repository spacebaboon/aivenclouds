import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
} from '@material-ui/core';

import React from 'react';
import { Row } from './CloudList';

type TableProps = {
  data: Row[];
  isLoading: boolean;
  error?: string | null;
};

export const CloudTable = ({ data, isLoading, error }: TableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Distance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell>Loading...</TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell>Unable to load data</TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.region}</TableCell>
                <TableCell>{row.distance}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
