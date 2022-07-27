import { Link } from 'react-router-dom';
import {
  IconButton,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { BiHeart, BiBell, BiUser, BiCog, BiLogOut } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/user-slice';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { listingActions } from '../../store/listing-slice';

const NavUser = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        dispatch(listingActions.setSavedIds([]));
        dispatch(listingActions.setSavedList([]));
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Stack direction="row" spacing={4} align="center">
      <IconButton
        display={['none', 'flex', 'flex', 'flex']}
        bg="gray.200"
        _hover={{ bg: 'gray.300' }}
        aria-label="Notification"
        icon={<BiBell />}
        borderRadius="2xl"
      />
      <Link to="/saved">
        <IconButton
          display={['none', 'flex', 'flex', 'flex']}
          bg="gray.200"
          _hover={{ bg: 'gray.300' }}
          aria-label="Like"
          icon={<BiHeart />}
          borderRadius="2xl"
        />
      </Link>

      <Menu autoSelect="false" direction="ltr">
        <MenuButton
          bg="gray.200"
          _hover={{ bg: 'gray.300' }}
          borderRadius="2xl"
          p="3"
        >
          <BiUser />{' '}
        </MenuButton>
        <MenuList>
          <MenuItem icon={<BiUser size="16px" />}>My Account</MenuItem>
          <Link to="/saved">
            <MenuItem icon={<BiHeart size="16px" />}>My Saved List</MenuItem>
          </Link>
          <MenuItem icon={<BiCog size="16px" />}>Settings</MenuItem>
          <MenuDivider />
          <MenuItem icon={<BiLogOut size="16px" />} onClick={logoutHandler}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
};

export default NavUser;
