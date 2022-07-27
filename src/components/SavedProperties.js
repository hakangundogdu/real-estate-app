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
import { useSelector, useDispatch } from 'react-redux';
import { auth, colRef } from '../firebase-config';
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  doc,
  get,
  setDoc,
  getDoc,
  addDoc,
  deleteDoc,
} from '@firebase/firestore';
import { fetchMultipleProperty } from '../lib/api';

import { onAuthStateChanged } from 'firebase/auth';
import Spinner from './Spinner';

const SavedProperties = () => {
  const userId = useSelector((state) => state.user.uid);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState();

  const q = query(colRef, where('uid', '==', `${userId}`));

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await getDocs(q);
  //     let userData = [];
  //     data.docs.forEach((doc) => {
  //       userData.push(doc.data());
  //     });
  //     fetchMultipleProperty({ savedIds: userData[0].saved }).then((data) => {
  //       setProperties(data.data);
  //       console.log('after fetch', data.data);
  //     });

  //     // setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getData();
  // }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await onSnapshot(q, (snapshot) => {
        let userData = [];
        snapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        console.log(userData);

        fetchMultipleProperty({ savedIds: userData[0].saved }).then((data) => {
          setProperties(data.data);
          console.log('after fetch', data.data);
        });
      });

      // setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
  }, []);

  // onSnapshot(q, (snapshot) => {
  //   let userData = [];
  //   snapshot.forEach((doc) => {
  //     userData.push(doc.data());
  //   });
  //   console.log(userData);
  // });

  // useEffect(() => {
  //   fetchMultipleProperty({ savedIds: savedIds }).then((data) => {
  //     setProperties(data);
  //     console.log('properties', properties);
  //   });
  // }, []);

  return (
    <Box my="0">
      <Text
        fontSize={{ base: 'lg', md: 'xl' }}
        fontWeight="semibold"
        lineHeight="short"
        px="4"
      >
        Saved Properties
      </Text>
      <SimpleGrid my="4" columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {!properties && <Spinner />}
        {properties.map((property) => (
          <PropertyBox
            onClick={() => setSelectedProperty(property)}
            property={property}
            key={property.id}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SavedProperties;
