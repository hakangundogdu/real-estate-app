import { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  CircularProgress,
  Center,
  Button,
  HStack,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import PropertyBox from './PropertyBox';
import Map from './Map';

const Property = () => {
  const properties = useSelector((state) => state.listing.properties);
  const isLoading = useSelector((state) => state.listing.isLoading);
  const isSearched = useSelector((state) => state.listing.isSearched);
  const [isMapView, setIsMapView] = useState(false);

  return (
    <>
      <Box my="8">
        {!isLoading && (
          <HStack align="center" justify="space-between">
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight="semibold"
              lineHeight="short"
            >
              {!isSearched && 'Featured Listings in London'}
              {isSearched &&
                `Properties ${
                  properties[0].listing_status === 'sale'
                    ? 'For Sale'
                    : 'To Rent'
                } in ${properties[0].county}`}
            </Text>
            <Button
              onClick={(prev) => setIsMapView(!isMapView)}
              colorScheme="gray.800"
              variant="link"
            >
              {!isMapView ? 'Show Map' : 'Hide Map'}
            </Button>
          </HStack>
        )}
        {!isLoading && isMapView && <Map />}

        {isLoading && (
          <Center h="200px" w="100%">
            <CircularProgress isIndeterminate color="green.300" />
            <Text mt={2} fontWeight="semibold" lineHeight="short"></Text>
          </Center>
        )}

        <SimpleGrid my="4" columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
          {properties.map((property) => (
            <PropertyBox property={property} key={property.listing_id} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Property;
