import Footer from './Footer';
import Navbar from './Navbar';

import { Box } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Box maxWidth="1280px" m="auto">
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
};

export default Layout;
