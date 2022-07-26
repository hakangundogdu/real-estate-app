import { Link } from 'react-router-dom';
import { Box, VStack, Text, Button } from '@chakra-ui/react';

const Error = () => {
  return (
    <Box my="8">
      <VStack align="center" justify="center">
        <Text
          fontSize={{ base: 'xl', md: '4xl' }}
          fontWeight="bold"
          color="gray.800"
        >
          Page Not Found
        </Text>
        <Button colorScheme="green" mt="6" variant="link">
          <Link to="/">Back to Home Page</Link>
        </Button>
      </VStack>
    </Box>
  );
};

export default Error;
