import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Layout from './components/UI/Layout';
import { Provider } from 'react-redux';
import store from './store/index';

import { ChakraProvider } from '@chakra-ui/react';

import { theme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <HashRouter>
        <Layout>
          <App />
        </Layout>
      </HashRouter>
    </ChakraProvider>
  </Provider>
);
