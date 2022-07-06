import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  IconButton,
  Stack,
  Flex,
  Box,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { BiHeart, BiBell, BiUser } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/user-slice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log('Navbar', user);

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

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

      {user ? (
        <Stack direction="row" spacing={4} align="center">
          <Button onClick={logoutHandler} colorScheme="gray.800" variant="link">
            Log out
          </Button>
          <IconButton
            bg="gray.200"
            _hover={{ bg: 'gray.300' }}
            aria-label="Notification"
            icon={<BiBell />}
            borderRadius="full"
          />
          <IconButton
            bg="gray.200"
            _hover={{ bg: 'gray.300' }}
            aria-label="Like"
            icon={<BiHeart />}
            borderRadius="full"
          />

          <Link to="/profile">
            <IconButton
              bg="gray.200"
              _hover={{ bg: 'gray.300' }}
              aria-label="Like"
              icon={<BiUser />}
              borderRadius="full"
            />{' '}
          </Link>
        </Stack>
      ) : (
        <Stack direction="row" spacing={4}>
          <Button colorScheme="gray.800" variant="link">
            <Link to="/login">Log in</Link>
          </Button>
          <Button colorScheme="green" variant="solid">
            <Link to="/signup">Sign up</Link>
          </Button>
        </Stack>
      )}
    </Flex>
  );
};

export default NavBar;
