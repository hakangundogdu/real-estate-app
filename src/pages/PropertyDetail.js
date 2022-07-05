import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Image,
  Flex,
  Badge,
  Text,
  HStack,
  VStack,
  Stack,
  Button,
} from '@chakra-ui/react';
import { BiBath, BiBed, BiHeart, BiPhone } from 'react-icons/bi';
import FallbackImage from '../assets/fallback.png';
import millify from 'millify';

const PropertyDetail = () => {
  const [properties, setProperties] = useState(
    JSON.parse(window.localStorage.getItem('Property List'))
  );

  const params = useParams();

  const property = properties.find(
    (listing) => listing.listing_id === params.listing_id
  );

  return (
    <HStack role="group" justify="flex-start" my="14" gap="10">
      <Box position="relative">
        <Image
          borderRadius="xl"
          objectFit="cover"
          alt="house"
          w="100%"
          h="430px"
          src={property.image_645_430_url}
          fallbackSrc={FallbackImage}
        />
      </Box>
      <VStack h="100%" gap="4" align="flex-start">
        <Flex align="baseline" mt={2}>
          <Badge colorScheme="blue" fontSize="md">
            {' '}
            FOR {property.listing_status}
          </Badge>
          {/* <Text
            ml={2}
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="bold"
            color="pink.800"
          >
            {property.county}{' '}
          </Text> */}
        </Flex>

        <Text mt={2} fontSize="2xl" fontWeight="semibold" lineHeight="short">
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
          mt={6}
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
      </VStack>
    </HStack>
  );
};

export default PropertyDetail;
