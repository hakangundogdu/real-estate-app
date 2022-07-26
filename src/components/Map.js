import { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Box, Grid, GridItem, Show } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import PropertyBox from './PropertyBox';

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  scrollwheel: true,
};

const coordinates = {
  London: {
    lat: 51.509865,
    lng: -0.118092,
  },
  Leeds: {
    lat: 53.801277,
    lng: -1.548567,
  },
  Bristol: {
    lat: 51.454514,
    lng: -2.58791,
  },
};

const Map = () => {
  const properties = useSelector((state) => state.listing.properties);
  const searchLocation = useSelector((state) => state.listing.searchLocation);

  const [selectedProperty, setSelectedProperty] = useState(properties[0]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return;

  return (
    <Grid
      h={{ base: '340px', md: '457px' }}
      my="4"
      w="full"
      templateColumns="repeat(3, 1fr)"
      gap={4}
    >
      <GridItem colSpan={{ base: 3, md: 2 }}>
        <Box
          w="full"
          h={{ base: '340px', md: '457px' }}
          borderRadius="2xl"
          overflow="hidden"
        >
          <GoogleMap
            options={options}
            zoom={11}
            center={coordinates[searchLocation] || coordinates.London}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            defaultOptions={{ disableDefaultUI: false }}
          >
            {properties.map((property) => (
              <Marker
                position={{ lat: property.latitude, lng: property.longitude }}
                key={property.listing_id}
                onClick={() => setSelectedProperty(property)}
              />
            ))}
          </GoogleMap>
        </Box>
      </GridItem>
      <Show above="md">
        <GridItem colSpan={1}>
          <PropertyBox
            property={selectedProperty}
            key={selectedProperty.listing_id}
          />
        </GridItem>
      </Show>
    </Grid>
  );
};
export default Map;
