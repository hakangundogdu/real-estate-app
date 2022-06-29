import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Layout from './components/Layout';

import { ChakraProvider } from '@chakra-ui/react';

import { theme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <Layout>
      <App />
    </Layout>
  </ChakraProvider>
);
