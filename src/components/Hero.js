import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Stack, Flex, Button, Text, Spacer, Input } from '@chakra-ui/react';

import { fetchListingData, listingActions } from '../store/listing-slice';

export default function Hero() {
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();

  const locationChangeHandler = (event) => {
    setLocation(event.target.value);
  };

  const searchRentHandler = (e) => {
    e.preventDefault();
    dispatch(listingActions.isLoading());
    dispatch(listingActions.isSearched(true));
    dispatch(fetchListingData({ county: location, listing_status: 'rent' }));
    setLocation('');
    dispatch(listingActions.setSearchLocation(location));
  };

  const searchSaleHandler = (e) => {
    e.preventDefault();
    dispatch(listingActions.isLoading());
    dispatch(listingActions.isSearched(true));
    dispatch(
      fetchListingData({ county: location || '', listing_status: 'sale' })
    );
    setLocation('');
    dispatch(listingActions.setSearchLocation(location));
  };

  return (
    <Flex
      w={'full'}
      h={'40vh'}
      backgroundImage={'url(https://source.unsplash.com/178j8tJrNlc/1920)'}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      borderRadius="2xl"
      justify={'center'}
      align="center"
    >
      <Flex
        direction="column"
        align="center"
        justifyContent="center"
        bg="gray.800"
        width={[
          '100%', // 0-30em
          'lg', // 30em-48em
          'xl', // 48em-62em
          'xl', // 62em+
        ]}
        height={[
          '100%', // 0-30em
          '40vh', // 30em-48em
          '200', // 48em-62em
          '200', // 62em+
        ]}
        p={7}
        borderRadius="2xl"
        color="white"
        opacity="1"
      >
        <Text
          fontSize={['2xl', '2xl', '3xl', '3xl']}
          color="green.400"
          fontWeight="bold"
        >
          Find Your Dream Home
        </Text>
        <Text fontSize={['md', 'md', 'xl', 'xl']} mb="2" fontWeight="semibold">
          Search properties for sale and to rent in the UK
        </Text>
        <Spacer />
        <Stack direction={['column', 'row']} spacing={4}>
          <Input
            bg="white"
            placeholder=" 'London', 'Leeds' or 'Bristol'"
            focusBorderColor="green.400"
            width="300px"
            size="md"
            variant="outline"
            color="gray.800"
            isRequired={true}
            value={location}
            onChange={locationChangeHandler}
            type="text"
          />

          <Button
            onClick={searchSaleHandler}
            colorScheme="green"
            variant="solid"
          >
            <a href="/">For Sale</a>
          </Button>
          <Button
            onClick={searchRentHandler}
            colorScheme="green"
            variant="solid"
          >
            <a href="/">To Rent</a>
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}
