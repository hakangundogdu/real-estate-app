import { useState } from 'react';
import { Box, SimpleGrid, Text, Button, HStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import PropertyBox from './PropertyBox';
import Map from './Map/Map';
import Spinner from './UI/Spinner';

const Property = () => {
  const properties = useSelector((state) => state.listing.properties);
  const isLoading = useSelector((state) => state.listing.isLoading);
  const isSearched = useSelector((state) => state.listing.isSearched);
  const searchLocation = useSelector((state) => state.listing.searchLocation);
  const [isMapView, setIsMapView] = useState(false);

  return (
    <>
      <Box my="8">
        {!isLoading && (
          <>
            <HStack align="center" px="4" justify="space-between">
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                fontWeight="semibold"
                lineHeight="short"
              >
                {!isSearched && 'Featured Listings'}
                {isSearched &&
                  `Properties ${
                    properties[0].listing_status === 'sale'
                      ? 'For Sale'
                      : 'To Rent'
                  } ${searchLocation === '' ? '' : 'in ' + searchLocation}`}
              </Text>
              <Button
                onClick={(prev) => setIsMapView(!isMapView)}
                colorScheme="gray.800"
                variant="link"
              >
                {!isMapView ? 'Show Map' : 'Hide Map'}
              </Button>
            </HStack>
            {isMapView && <Map />}
            <SimpleGrid my="4" columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
              {properties.map((property) => (
                <PropertyBox property={property} key={property.id} />
              ))}
            </SimpleGrid>
          </>
        )}
        {isLoading && <Spinner />}
      </Box>
    </>
  );
};

export default Property;
