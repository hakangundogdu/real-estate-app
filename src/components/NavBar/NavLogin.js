import { Link } from 'react-router-dom';
import { Button, Stack } from '@chakra-ui/react';

const NavLogin = () => {
  return (
    <Stack direction="row" spacing={4}>
      <Button colorScheme="gray.800" variant="link">
        <Link to="/login">Log in</Link>
      </Button>
      <Button
        display={['none', 'flex', 'flex', 'flex']}
        colorScheme="green"
        variant="solid"
      >
        <Link to="/signup">Sign up</Link>
      </Button>
    </Stack>
  );
};

export default NavLogin;
