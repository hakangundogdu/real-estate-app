import {
  Box,
  SimpleGrid,
  Button,
  Text,
  CircularProgress,
  Center,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import PropertyBox from './PropertyBox';

const Property = () => {
  const listings = useSelector((state) => state.listing);
  const isLoading = useSelector((state) => state.listing.isLoading);

  const { properties } = listings;
  return (
    <Box my="8">
      <Text mt={2} fontSize="2xl" fontWeight="semibold" lineHeight="short">
        Latest Listings
      </Text>

      <Button colorScheme="green" size="sm" variant="link">
        <a href="/">View All Listings</a>
      </Button>
      {isLoading ? (
        <Center w="100%">
          <CircularProgress isIndeterminate color="green.300" />
        </Center>
      ) : (
        <SimpleGrid my="4" columns={3} spacing={4}>
          {properties.map((property) => (
            <PropertyBox property={property} key={property.listing_id} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Property;
