import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Stack, Flex, Button, Text, Spacer, Input } from '@chakra-ui/react';

import { fetchListingData } from '../store/listing-slice';

export default function Hero() {
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();

  const locationChangeHandler = (event) => {
    setLocation(event.target.value);
  };

  const searchRentHandler = (e) => {
    e.preventDefault();
    console.log(location);
    dispatch(fetchListingData({ area: location, listing_status: 'rent' }));
  };

  const searchSaleHandler = (e) => {
    e.preventDefault();
    console.log(location);
    dispatch(
      fetchListingData({
        area: 'London',
        listing_status: 'sale',
        listing_id: '61726950',
      })
    );
  };

  return (
    <Flex
      w={'full'}
      h={'40vh'}
      backgroundImage={'url(https://source.unsplash.com/178j8tJrNlc/1920)'}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      borderRadius="20"
      justify={'center'}
      align="center"
    >
      <Flex
        direction="column"
        align="center"
        justifyContent="center"
        bg="gray.800"
        w="xl"
        height="200"
        p={7}
        borderRadius="20"
        color="white"
        opacity="1"
      >
        <Text fontSize="3xl" color="green.400" fontWeight="bold">
          Find Your Dream Home
        </Text>
        <Text fontSize="xl" fontWeight="semibold">
          Search properties for sale and to rent
        </Text>
        <Spacer />
        <Stack direction="row" spacing={4}>
          <Input
            bg="white"
            placeholder="e.g 'London'"
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
