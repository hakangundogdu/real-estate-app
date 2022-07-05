import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Flex, Box, Spacer, Text } from '@chakra-ui/react';

const NavBar = () => {
  return (
    <Flex bg="gray.50" px="0" my="4" p="4" borderRadius="xl">
      <Box fontSize="2xl" paddingLeft="2" color="gray.800" fontWeight="bold">
        <Link to="/">
          Dream{' '}
          <Text display="inline-block" color="green.400">
            Home
          </Text>{' '}
        </Link>
      </Box>
      <Spacer />
      <Stack direction="row" spacing={4}>
        <Button colorScheme="gray.800" variant="link">
          <Link to="/login">Log in</Link>
        </Button>
        <Button colorScheme="green" variant="solid">
          <Link to="/signup">Sign up</Link>
        </Button>
      </Stack>
    </Flex>
  );
};

export default NavBar;
