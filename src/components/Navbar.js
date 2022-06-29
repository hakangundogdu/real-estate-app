import React from 'react';
import { Button, Stack, Flex, Box, Spacer } from '@chakra-ui/react';

const NavBar = () => {
  return (
    <Flex px="0" py="4" borderBottom="1px" borderColor="gray.100">
      <Box fontSize="2xl" paddingLeft="2" color="gray.800" fontWeight="bold">
        <a href="/">Dream Home</a>
      </Box>
      <Spacer />
      <Stack direction="row" spacing={4}>
        <Button colorScheme="gray.600" variant="link">
          <a href="/">Log in</a>
        </Button>
        <Button colorScheme="green" variant="solid">
          <a href="/">Sign up</a>
        </Button>
      </Stack>
    </Flex>
  );
};

export default NavBar;
