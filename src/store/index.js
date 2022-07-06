import { configureStore } from '@reduxjs/toolkit';

import listingSlice from './listing-slice';
import userSlice from './user-slice';

const store = configureStore({
  reducer: { listing: listingSlice.reducer, user: userSlice.reducer },
});

export default store;
