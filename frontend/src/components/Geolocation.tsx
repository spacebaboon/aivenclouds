import React from 'react';
import { geolocated, GeolocatedProps } from 'react-geolocated';

type GeolocationProps = {
  children: React.ReactElement;
} & GeolocatedProps;

export const Geolocation = (props: GeolocationProps) => {
  return (
    <>
      {!props.isGeolocationAvailable ? (
        <div>Browser does not support Geolocation</div>
      ) : !props.isGeolocationEnabled ? (
        <div>Geolocation not enabled in browser</div>
      ) : props.coords ? (
        React.cloneElement(props.children, { coords: props.coords })
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default geolocated()(Geolocation);
