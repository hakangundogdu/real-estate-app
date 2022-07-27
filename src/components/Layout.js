import Footer from './Footer';
import NavBar from './NavBar/NavBar';

import { VStack } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <VStack
      maxWidth="1280px"
      minHeight="100vh"
      align="space-between"
      px="4"
      m="auto"
      justify="space-between"
    >
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
      <footer position="absolute">
        <Footer />
      </footer>
    </VStack>
  );
};

export default Layout;
