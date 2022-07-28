import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
  useDisclosure,
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
import Error from '../components/UI/Error';
import Spinner from '../components/UI/Spinner';
import { db, colRef } from '../firebase-config';
import { addDoc, doc, updateDoc } from '@firebase/firestore';
import MapWide from '../components/Map/MapWide';
import ModalUi from './UI/ModalUi';

const PropertyDetail = () => {
  const { id } = useParams();
  const userId = useSelector((state) => state.user.uid);
  const savedIds = useSelector((state) => state.listing.savedIds);
  const firestoreUserId = useSelector((state) => state.listing.userId);
  const [property, setProperty] = useState();
  const [currentImage, setCurrentImage] = useState(0);
  const [error, SetError] = useState(false);
  const [isSaved, setSaved] = useState(savedIds.includes(id));
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(typeof id);
  console.log('isSaved', isSaved);
  console.log('savedIds', savedIds);
  console.log('includes', savedIds.includes(id));

  useEffect(() => {
    setSaved(savedIds.includes(id));
  }, [savedIds]);

  const popUpHandler = (e) => {
    e.preventDefault();
    onOpen();
  };

  const docRef = doc(db, 'users', `${firestoreUserId}`);

  const saveHandler = ({ id }) => {
    const newList = [...savedIds, id];
    console.log('newList', newList);

    if (savedIds.length === 0) {
      addDoc(colRef, {
        uid: userId,
        saved: newList,
      });
    } else {
      updateDoc(docRef, {
        uid: userId,
        saved: newList,
      });
    }
  };

  const removeSaveHandler = ({ id }) => {
    const newList = savedIds.filter((item) => item !== id);
    console.log('removedNewList', newList);
    updateDoc(docRef, {
      uid: userId,
      saved: newList,
    });
  };

  useEffect(() => {
    fetchSingleProperty({ id })
      .then((response) => {
        setProperty(response.data);
      })
      .catch((err) => {
        SetError(true);
      });
  }, [id]);

  //Scroll to top when navigate to this page
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

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
                  display="flex"
                  bg="whiteAlpha.800"
                  shadow="lg"
                  position="absolute"
                  top="46%"
                  left="2"
                  colorScheme="whiteAlpha.800"
                  color="gray.600"
                  icon={<BiChevronLeft size={36} />}
                  z-index="10"
                  onClick={scrollLeft}
                />
                <IconButton
                  display="flex"
                  bg="whiteAlpha.800"
                  shadow="lg"
                  position="absolute"
                  top="46%"
                  right="2"
                  colorScheme="whiteAlpha.800"
                  color="gray.600"
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
                  {!isSaved ? (
                    <Button
                      leftIcon={<BiHeart size={20} />}
                      colorScheme="green"
                      variant="solid"
                      // onClick={() => saveHandler({ id: property.id })}
                      onClick={
                        userId
                          ? () => saveHandler({ id: property.id })
                          : popUpHandler
                      }
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      leftIcon={<BiHeart size={20} />}
                      colorScheme="green"
                      variant="outline"
                      onClick={() => removeSaveHandler({ id: property.id })}
                    >
                      Remove
                    </Button>
                  )}
                  <Button
                    leftIcon={<BiPhone size={20} />}
                    colorScheme="gray"
                    variant="outline"
                  >
                    Call Agent
                  </Button>
                </Stack>
              </Flex>
            </Stack>
            <MapWide
              latitude={property.latitude}
              longitude={property.longitude}
            />
          </Box>
        )}
        <ModalUi
          onClose={onClose}
          isOpen={isOpen}
          title={'Oops!'}
          message={'Please login to save properties!'}
        />
      </Box>
    </>
  );
};

export default PropertyDetail;
