import { useSelector } from 'react-redux';

import { Flex, Spacer } from '@chakra-ui/react';

import NavLogo from './NavLogo';
import NavUser from './NavUser';
import NavLogin from './NavLogin';

const NavBar = () => {
  const userId = useSelector((state) => state.user.uid);

  return (
    <Flex bg="gray.50" px="0" my="4" p="4" align="center" borderRadius="2xl">
      <NavLogo />
      <Spacer />
      {userId ? <NavUser /> : <NavLogin />}
    </Flex>
  );
};

export default NavBar;
