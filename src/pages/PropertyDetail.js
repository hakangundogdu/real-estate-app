import { Box, Stack, Image, Flex, Badge, Text } from '@chakra-ui/react';
import { MdStar } from 'react-icons/md';

const PropertyDetail = () => {
  return (
    <Box my="8">
      <Stack my="4" direction="row" spacing={4}>
        <Box p="5" borderRadius="2xl" maxW="320px" borderWidth="1px">
          <Image borderRadius="xl" src="https://bit.ly/2k1H1t6" />
          <Flex align="baseline" mt={2}>
            <Badge colorScheme="blue">For Rent</Badge>
            <Text
              ml={2}
              textTransform="uppercase"
              fontSize="sm"
              fontWeight="bold"
              color="pink.800"
            >
              Verified &bull; Cape Town
            </Text>
          </Flex>
          <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
            Modern Penthouse with Mountain, City & Sea Views
          </Text>
          <Text mt={2}>$1.5K/month</Text>
          <Flex mt={2} align="center">
            <Box as={MdStar} color="orange.400" />
            <Text ml={1} fontSize="sm">
              <b>4.84</b> (190)
            </Text>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
};

export default PropertyDetail;
