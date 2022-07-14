import { useState, useEffect } from 'react';
import {
  Image,
  Flex,
  Badge,
  Text,
  SimpleGrid,
  Button,
  Stack,
  Box,
} from '@chakra-ui/react';
import { BiBath, BiBed, BiHeart, BiPhone } from 'react-icons/bi';
import FallbackImage from '../assets/fallback.png';
import millify from 'millify';
import PropertyBox from './PropertyBox';
import PropertyDetail from './PropertyDetail';
import { useSelector, useDispatch } from 'react-redux';
// import { getFavourites } from '../store/listing-slice';
import { db, auth } from '../firebase-config';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  get,
  setDoc,
  getDoc,
  addDoc,
  deleteDoc,
} from '@firebase/firestore';

import { onAuthStateChanged } from 'firebase/auth';

const SavedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState();
  const [user, setUser] = useState();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser.email);
  });

  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.user);
  console.log('detail page', user);

  // const getTasks = async () => {
  //   const data = await getDocs(taskCollectionRef);
  //   setTasksList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // };

  const getData = async () => {
    const favCollectionRef = collection(db, 'favourites');
    const q = query(collection(db, 'favourites'), where('user', '==', user));
    const data = await getDocs(q);
    // const data = await getDocs(favCollectionRef);
    setProperties(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log('saved items', data.docs[0].data());
    setSelectedProperty(data.docs[0].data());
    console.log('selected ID', data.docs[0].id);
    console.log(properties);
    let storedData = JSON.parse(window.localStorage.getItem('Property List'));

    storedData.push(...properties);
    // storedData.push(data.docs[0].data());
    window.localStorage.setItem('Property List', JSON.stringify(storedData));
  };

  return (
    <>
      {/* {selectedProperty && (
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
            src={selectedProperty.image_645_430_url}
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
                FOR {selectedProperty.listing_status}
              </Badge>
            </Flex>

            <Text
              mt={2}
              fontSize="2xl"
              fontWeight="semibold"
              lineHeight="short"
            >
              {selectedProperty.title}{' '}
            </Text>
            <Text fontSize="lg" mt={2}>
              £{millify(selectedProperty.price)}
            </Text>
            <Text fontSize="lg" mt={2}>
              {selectedProperty.displayable_address}
            </Text>

            <Flex
              alignItems="center"
              my="2"
              justifyContent="flex-start"
              color="green.400"
            >
              <BiBed size={24} />{' '}
              <Text fontWeight="semibold" fontSize="lg" mr={6} ml={2}>
                {selectedProperty.num_bedrooms}
              </Text>{' '}
              <BiBath size={24} />
              <Text fontWeight="semibold" fontSize="lg">
                {selectedProperty.num_bathrooms}
              </Text>{' '}
            </Flex>
            <Stack direction="row" spacing={4}>
              <Button
                leftIcon={<BiHeart size={20} />}
                colorScheme="green"
                variant="solid"
                // onClick={() => deleteHandler(selectedProperty.id)}
              >
                Remove from Saved
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
      )} */}

      <Button onClick={getData}>Get Data</Button>
      <SimpleGrid my="4" columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {properties.map((property) => (
          <PropertyBox
            onClick={() => setSelectedProperty(property)}
            property={property}
            key={property.listing_id}
          />

          // <Box
          //   onClick={() => setSelectedProperty(property)}
          //   role="group"
          //   p="5"
          //   borderRadius="2xl"
          //   borderWidth="1px"
          // >
          //   <Box position="relative">
          //     <Image
          //       borderRadius="xl"
          //       fit="cover"
          //       alt="house"
          //       w="100%"
          //       h="255px"
          //       src={property.image_354_255_url}
          //       fallbackSrc={FallbackImage}
          //     />
          //   </Box>
          //   <Flex align="baseline" mt={2}>
          //     {property.listing_status === 'rent' ? (
          //       <Badge colorScheme="blue"> TO RENT</Badge>
          //     ) : (
          //       <Badge colorScheme="red"> FOR SALE</Badge>
          //     )}
          //     <Text
          //       ml={2}
          //       textTransform="uppercase"
          //       fontSize="sm"
          //       fontWeight="bold"
          //       color="green.600"
          //     >
          //       {property.county}{' '}
          //     </Text>
          //   </Flex>
          //   <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
          //     {property.title}{' '}
          //   </Text>
          //   <Text mt={2}>
          //     £{millify(property.price)}
          //     {property.listing_status === 'rent' && ' / month'}{' '}
          //   </Text>

          //   <Text mt={2}>
          //     {property.displayable_address.length > 45
          //       ? property.displayable_address.substring(0, 45) + '...'
          //       : property.displayable_address}
          //   </Text>
          //   <Flex
          //     alignItems="center"
          //     mt={2}
          //     justifyContent="flex-start"
          //     color="green.400"
          //   >
          //     <BiBed size={20} />{' '}
          //     <Text fontWeight="semibold" mr={4} ml={2}>
          //       {property.num_bedrooms}
          //     </Text>{' '}
          //     <BiBath size={20} />
          //     <Text fontWeight="semibold" ml={2}>
          //       {property.num_bathrooms}
          //     </Text>{' '}
          //   </Flex>
          // </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default SavedProperties;
