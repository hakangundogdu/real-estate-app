import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveFavourites } from '../store/listing-slice';
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
  IconButton,
  VStack,
} from '@chakra-ui/react';
import {
  BiBath,
  BiBed,
  BiHeart,
  BiPhone,
  BiChevronRight,
  BiChevronLeft,
} from 'react-icons/bi';
import FallbackImage from '../assets/fallback.png';
import millify from 'millify';
import { fetchSingleProperty } from '../lib/api';
import Error from '../components/Error';
import Spinner from '../components/Spinner';

const PropertyDetail = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.uid);
  const [property, setProperty] = useState();
  const [currentImage, setCurrentImage] = useState(0);
  const [error, SetError] = useState(false);

  const saveHandler = () => {};

  const { id } = useParams();

  useEffect(() => {
    fetchSingleProperty({ id })
      .then((response) => {
        setProperty(response.data);
      })
      .catch((err) => {
        SetError(true);
      });
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

  //Image Scroll

  const propertyImages = property?.images.map((image) => {
    return image['645x430'];
  });
  //Scroll Functions
  const scrollLeft = () => {
    setCurrentImage((currentImage) => {
      if (currentImage === 0) {
        return propertyImages.length - 1;
      }
      return currentImage - 1;
    });
  };
  const scrollRight = () => {
    setCurrentImage((currentImage) => {
      if (currentImage === propertyImages.length - 1) {
        return 0;
      }
      return currentImage + 1;
    });
  };

  return (
    <>
      <Box minH="100%">
        {error && <Error />}
        {!error && !property && <Spinner />}
        {property && (
          <Box>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              role="group"
              justify="flex-start"
              align="center"
            >
              <VStack position="relative" w="full">
                <IconButton
                  display="none"
                  bg="whiteAlpha.800"
                  shadow="lg"
                  _groupHover={{ display: 'flex' }}
                  position="absolute"
                  top="46%"
                  left="2"
                  color="gray.700"
                  icon={<BiChevronLeft size={36} />}
                  z-index="10"
                  onClick={scrollLeft}
                />
                <IconButton
                  display="none"
                  bg="whiteAlpha.800"
                  shadow="lg"
                  _groupHover={{ display: 'flex' }}
                  position="absolute"
                  top="46%"
                  right="2"
                  color="gray.700"
                  icon={<BiChevronRight size={36} />}
                  z-index="10"
                  onClick={scrollRight}
                />

                <Image
                  objectFit="cover"
                  alt="house"
                  w="full"
                  borderRadius="2xl"
                  overflow="hidden"
                  h={{ base: '300px', md: '430px' }}
                  src={propertyImages[currentImage]}
                  fallbackSrc={FallbackImage}
                />
              </VStack>

              {/* <Image
                objectFit="cover"
                alt="house"
                w="full"
                borderRadius="2xl"
                overflow="hidden"
                h={{ base: '300px', md: '430px' }}
                src={property.image_645_430_url}
                fallbackSrc={FallbackImage}
              /> */}

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
              <Box
                w="full"
                h="400px"
                borderRadius="2xl"
                mt="6"
                overflow="hidden"
              >
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
                    position={{
                      lat: property.latitude,
                      lng: property.longitude,
                    }}
                  />
                </GoogleMap>
              </Box>
            ) : null}
          </Box>
        )}
      </Box>
    </>
  );
};

export default PropertyDetail;
