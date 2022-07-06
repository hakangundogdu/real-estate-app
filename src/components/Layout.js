import Footer from './Footer';
import Navbar from './Navbar';

import { Box } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Box
      maxWidth="1280px"
      minHeight="100vh"
      align="space-between"
      px="4"
      m="auto"
    >
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer position="absolute">
        <Footer />
      </footer>
    </Box>
  );
};

export default Layout;
