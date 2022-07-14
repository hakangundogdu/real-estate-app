import React from 'react';
import { Image, Flex, Badge, Text, Stack, Button } from '@chakra-ui/react';
import { BiBath, BiBed, BiHeart, BiPhone } from 'react-icons/bi';
import FallbackImage from '../assets/fallback.png';
import millify from 'millify';

const PropertyDetail = (props) => {
  return (
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
        src={props.image_645_430_url}
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
            FOR {props.listing_status}
          </Badge>
        </Flex>

        <Text mt={2} fontSize="2xl" fontWeight="semibold" lineHeight="short">
          {props.title}{' '}
        </Text>
        <Text fontSize="lg" mt={2}>
          £{millify(props.price)}
        </Text>
        <Text fontSize="lg" mt={2}>
          {props.displayable_address}
        </Text>

        <Flex
          alignItems="center"
          my="2"
          justifyContent="flex-start"
          color="green.400"
        >
          <BiBed size={24} />{' '}
          <Text fontWeight="semibold" fontSize="lg" mr={6} ml={2}>
            {props.num_bedrooms}
          </Text>{' '}
          <BiBath size={24} />
          <Text fontWeight="semibold" fontSize="lg">
            {props.num_bathrooms}
          </Text>{' '}
        </Flex>
        <Stack direction="row" spacing={4}>
          <Button
            leftIcon={<BiHeart size={20} />}
            colorScheme="green"
            variant="solid"
            o
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
  );
};

export default PropertyDetail;
