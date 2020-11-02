import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GeolocatedProps } from 'react-geolocated';
import { CloudTable } from './CloudTable';

export type Row = {
  id: string;
  description: string;
  region: string;
  distance: number;
  provider: string;
};

export type APIResponse = {
  clouds: Row[];
};

type CloudListProps = {
  coords?: GeolocatedProps['coords'];
};

export const CloudList = (props: CloudListProps) => {
  const [data, setData] = useState<Row[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const urlQuerystring = props.coords
    ? `?lat=${props.coords.latitude}&lon=${props.coords.longitude}`
    : '';
  const apiUrl = `http://localhost:5000/cloudlist${urlQuerystring}`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        setLoading(false);
        setData(response.data.clouds);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }, [setLoading, setError, setData, apiUrl]);

  return <CloudTable data={data} isLoading={loading} error={error} />;
};
