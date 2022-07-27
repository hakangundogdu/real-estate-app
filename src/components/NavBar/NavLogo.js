import Icon from '../../assets/icon.png';
import { Link } from 'react-router-dom';
import { Flex, Box, Text, Image } from '@chakra-ui/react';

const NavLogo = () => {
  return (
    <Box
      fontSize={['xl', 'xl', '2xl', '2xl']}
      paddingLeft="2"
      color="gray.800"
      fontWeight="bold"
    >
      <Link to="/">
        <Flex justify="center" align="center">
          <Image
            src={Icon}
            alt="logo"
            display="inline-block"
            w="auto"
            h="24px"
            mr="2"
            py="auto"
          />
          <Text color="gray.800"> Dream</Text>{' '}
          <Text ml="1" color="green.400">
            Home
          </Text>{' '}
        </Flex>
      </Link>
    </Box>
  );
};

export default NavLogo;
