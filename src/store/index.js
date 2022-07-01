import { configureStore } from '@reduxjs/toolkit';

import listingSlice from './listing-slice';
import authSlice from './auth-slice';

const store = configureStore({
  reducer: { listing: listingSlice.reducer, auth: authSlice.reducer },
});

export default store;
