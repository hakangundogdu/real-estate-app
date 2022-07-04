import { configureStore } from '@reduxjs/toolkit';

import listingSlice from './listing-slice';

const store = configureStore({
  reducer: { listing: listingSlice.reducer },
});

export default store;
