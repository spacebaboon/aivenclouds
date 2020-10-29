import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CloudTable } from './CloudTable';

export type Row = {
  name: string;
  region: string;
  distance: number;
};

export type APIResponse = {
  clouds: Row[];
};

export const CloudList = () => {
  const [data, setData] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    // todo: move this into config file
    const apiUrl = `http://localhost:5000/clouds`;
    axios
      .get(apiUrl)
      .then((response) => {
        setLoading(false);
        setData(response.data.clouds);
      })
      .catch((error) => {
        setLoading(false);
        setError('Unable to load data');
      });
  }, [setLoading, setError, setData]);

  return <CloudTable data={data} isLoading={loading} error={error} />;
};
