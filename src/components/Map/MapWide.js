import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Box } from '@chakra-ui/react';

const MapWide = ({ latitude, longitude }) => {
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    scrollwheel: true,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  return (
    <>
      {isLoaded ? (
        <Box w="full" h="400px" borderRadius="2xl" mt="6" overflow="hidden">
          <GoogleMap
            options={options}
            zoom={12}
            center={{
              lat: latitude || 51.509865,
              lng: longitude || -0.118092,
            }}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            defaultOptions={{ disableDefaultUI: false }}
          >
            <Marker
              position={{
                lat: latitude,
                lng: longitude,
              }}
            />
          </GoogleMap>
        </Box>
      ) : null}
    </>
  );
};

export default MapWide;
