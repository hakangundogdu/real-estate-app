import {
  Box,
  SimpleGrid,
  Text,
  CircularProgress,
  Center,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import PropertyBox from './PropertyBox';

const Property = () => {
  const properties = useSelector((state) => state.listing.properties);
  const isLoading = useSelector((state) => state.listing.isLoading);
  const isSearched = useSelector((state) => state.listing.isSearched);

  return (
    <Box my="8">
      <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        {!isSearched && !isLoading && 'Featured Listings in London'}
        {isSearched && !isLoading && 'Properties Found'}
      </Text>

      {/* <Button colorScheme="green" size="sm" variant="link">
        <a href="/">View All Listings</a>
      </Button> */}
      {isLoading && (
        <Center h="200px" w="100%">
          <CircularProgress isIndeterminate color="green.300" />
        </Center>
      )}

      <SimpleGrid my="4" columns={3} spacing={4}>
        {properties.map((property) => (
          <PropertyBox property={property} key={property.listing_id} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Property;
