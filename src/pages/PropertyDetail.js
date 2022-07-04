import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listingActions } from '../store/listing-slice';
import {
  Box,
  Image,
  Flex,
  Badge,
  IconButton,
  Text,
  Center,
} from '@chakra-ui/react';
import { BiBath, BiBed, BiHeart } from 'react-icons/bi';
import FallbackImage from '../assets/fallback.png';
import millify from 'millify';

const PropertyDetail = () => {
  const dispatch = useDispatch();
  const [properties, setProperties] = useState(
    JSON.parse(window.localStorage.getItem('Property List'))
  );

  const params = useParams();

  // useEffect(() => {
  //   const data = window.localStorage.getItem('Property List');
  //   if (data !== null)
  //     dispatch(
  //       listingActions.setList({
  //         properties: JSON.parse(data),
  //       })
  //     );
  // }, [dispatch]);

  const property = properties.find(
    (listing) => listing.listing_id === params.listing_id
  );

  return (
    <Center>
      <Box role="group" p="5" borderRadius="2xl" borderWidth="1px">
        <Box position="relative">
          <IconButton
            display="none"
            _hover={{ bg: 'green.400', color: 'white' }}
            bg="gray.100"
            shadow="lg"
            _groupHover={{ display: 'flex' }}
            position="absolute"
            top="2"
            right="2"
            aria-label="Like"
            icon={<BiHeart />}
            z-index="10"
          />
          <Image
            borderRadius="xl"
            objectFit="cover"
            alt="house"
            w="100%"
            h="255px"
            src={property.image_354_255_url}
            fallbackSrc={FallbackImage}
          />
        </Box>
        <Flex align="baseline" mt={2}>
          <Badge colorScheme="blue"> FOR {property.listing_status}</Badge>
          <Text
            ml={2}
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="bold"
            color="pink.800"
          >
            {property.county}{' '}
          </Text>
        </Flex>
        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
          {property.title}{' '}
        </Text>
        <Text mt={2}>£{millify(property.price)}</Text>

        <Text mt={2}>
          {property.displayable_address.length > 45
            ? property.displayable_address.substring(0, 45) + '...'
            : property.displayable_address}
        </Text>
        <Flex
          alignItems="center"
          mt={2}
          justifyContent="flex-start"
          color="green.400"
        >
          <BiBed size={20} />{' '}
          <Text fontWeight="semibold" mr={4} ml={2}>
            {property.num_bedrooms}
          </Text>{' '}
          <BiBath size={20} />
          <Text fontWeight="semibold">{property.num_bathrooms}</Text>{' '}
        </Flex>
      </Box>
    </Center>
  );
};

export default PropertyDetail;
