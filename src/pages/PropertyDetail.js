import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveFavourites, fetchProperty } from '../store/listing-slice';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import {
  Box,
  Image,
  Flex,
  Badge,
  Text,
  Stack,
  Button,
  Center,
  CircularProgress,
} from '@chakra-ui/react';
import { BiBath, BiBed, BiHeart, BiPhone } from 'react-icons/bi';
import FallbackImage from '../assets/fallback.png';
import millify from 'millify';
import { fetchSingleProperty } from '../lib/api';
import axios from 'axios';

const PropertyDetail = () => {
  const dispatch = useDispatch();
  const [property, setProperty] = useState();
  const user = useSelector((state) => state.user.user);

  const saveHandler = (property) => {
    dispatch(saveFavourites({ user: user, property: property }));
  };

  const { id } = useParams();

  useEffect(() => {
    axios(`https://property-test.herokuapp.com/listings/${id}`).then(
      (response) => {
        setProperty(response.data);
      }
    );
  }, [id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

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
      {!property ? (
        <Center h="200px" w="100%">
          <CircularProgress isIndeterminate color="green.300" />
          <Text mt={2} fontWeight="semibold" lineHeight="short"></Text>
        </Center>
      ) : (
        <Box my="8">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            role="group"
            justify="flex-start"
            borderRadius="2xl"
            borderWidth="1px"
            overflow="hidden"
            align="center"
          >
            <Image
              objectFit="cover"
              alt="house"
              w="full"
              h={{ base: '300px', md: '430px' }}
              src={property.image_645_430_url}
              fallbackSrc={FallbackImage}
            />

            <Flex
              direction="column"
              h="100%"
              w="100%"
              gap={{ base: '1', md: '4' }}
              p={{ base: '4', md: '10' }}
              align="flex-start"
              justify="center"
            >
              <Flex align="baseline">
                <Badge colorScheme="blue" fontSize="md">
                  {' '}
                  FOR {property.listing_status}
                </Badge>
              </Flex>

              <Text
                mt={2}
                fontSize="2xl"
                fontWeight="semibold"
                lineHeight="short"
              >
                {property.title}{' '}
              </Text>
              <Text fontSize="lg" mt={2}>
                £{millify(property.price)}
              </Text>
              <Text fontSize="lg" mt={2}>
                {property.displayable_address}
              </Text>

              <Flex
                alignItems="center"
                my="2"
                justifyContent="flex-start"
                color="green.400"
              >
                <BiBed size={24} />{' '}
                <Text fontWeight="semibold" fontSize="lg" mr={6} ml={2}>
                  {property.num_bedrooms}
                </Text>{' '}
                <BiBath size={24} />
                <Text fontWeight="semibold" fontSize="lg">
                  {property.num_bathrooms}
                </Text>{' '}
              </Flex>
              <Stack direction="row" spacing={4}>
                <Button
                  leftIcon={<BiHeart size={20} />}
                  colorScheme="green"
                  variant="solid"
                  onClick={() => saveHandler(property)}
                >
                  Save
                </Button>
                <Button
                  leftIcon={<BiPhone size={20} />}
                  colorScheme="gray"
                  variant="solid"
                >
                  Call Agent
                </Button>
              </Stack>
            </Flex>
          </Stack>
          {isLoaded ? (
            <Box w="full" h="400px" borderRadius="2xl" mt="6" overflow="hidden">
              <GoogleMap
                options={options}
                zoom={12}
                center={{
                  lat: property.latitude || 51.509865,
                  lng: property.longitude || -0.118092,
                }}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                defaultOptions={{ disableDefaultUI: false }}
              >
                <Marker
                  position={{ lat: property.latitude, lng: property.longitude }}
                />
              </GoogleMap>
            </Box>
          ) : null}
        </Box>
      )}
    </>
  );
};

export default PropertyDetail;
