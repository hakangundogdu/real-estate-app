import { Box, Image, Flex, Badge, IconButton, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { BiBath, BiBed, BiHeart } from 'react-icons/bi';
import FallbackImage from '../assets/fallback.png';
import millify from 'millify';
const PropertyBox = ({
  property: {
    image_354_255_url,
    title,
    price,
    num_bathrooms,
    num_bedrooms,
    county,
    displayable_address,
    listing_status,
    listing_id,
  },
}) => {
  return (
    <Link to={`/properties/${listing_id}`}>
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
            fit="cover"
            alt="house"
            w="100%"
            h="255px"
            src={image_354_255_url}
            fallbackSrc={FallbackImage}
          />
        </Box>
        <Flex align="baseline" mt={2}>
          {listing_status === 'rent' ? (
            <Badge colorScheme="blue"> TO RENT</Badge>
          ) : (
            <Badge colorScheme="red"> FOR SALE</Badge>
          )}
          <Text
            ml={2}
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="bold"
            color="green.600"
          >
            {county}{' '}
          </Text>
        </Flex>
        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
          {title}{' '}
        </Text>
        <Text mt={2}>
          £{millify(price)}
          {listing_status === 'rent' && ' / month'}{' '}
        </Text>

        <Text mt={2}>
          {displayable_address.length > 45
            ? displayable_address.substring(0, 45) + '...'
            : displayable_address}
        </Text>
        <Flex
          alignItems="center"
          mt={2}
          justifyContent="flex-start"
          color="green.400"
        >
          <BiBed size={20} />{' '}
          <Text fontWeight="semibold" mr={4} ml={2}>
            {num_bedrooms}
          </Text>{' '}
          <BiBath size={20} />
          <Text fontWeight="semibold" ml={2}>
            {num_bathrooms}
          </Text>{' '}
        </Flex>
      </Box>
    </Link>
  );
};

export default PropertyBox;
