import { createSlice } from '@reduxjs/toolkit';

import { db, colRef } from '../firebase-config';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from '@firebase/firestore';

import {
  fetchProperties,
  fetchNoLocation,
  fetchSingleProperty,
  fetchMultipleProperty,
} from '../lib/api';

const listingSlice = createSlice({
  name: 'listing',
  initialState: {
    properties: [],
    isLoading: false,
    isSearched: false,
    searchLocation: null,
    property: null,
    savedProperties: [],
    savedIds: [],
    userId: null,
  },
  reducers: {
    setList(state, action) {
      state.properties = action.payload.properties;
      window.localStorage.setItem(
        'Property List',
        JSON.stringify(state.properties)
      );
    },
    setSavedList(state, action) {
      state.savedProperties = action.payload.savedProperties;
    },
    setSavedIds(state, action) {
      state.savedIds = action.payload.savedIds;
    },
    setUserId(state, action) {
      state.userId = action.payload.userId;
    },

    setProperty(state, action) {
      state.property = action.payload;
    },
    setSearchLocation(state, action) {
      state.searchLocation = action.payload;
    },

    isLoading(state) {
      state.isLoading = !state.isLoading;
    },
    isSearched(state, action) {
      state.isSearched = action.payload;
    },
  },
});

export const fetchListingData = ({ county, listing_status }) => {
  return async (dispatch) => {
    const fetchFunction = county
      ? fetchProperties({
          county: county,
          listing_status: listing_status,
        })
      : fetchNoLocation({
          listing_status: listing_status,
        });

    const listData = await fetchFunction;

    dispatch(
      listingActions.setList({
        properties: listData || [],
      })
    );
    dispatch(listingActions.isLoading());
    dispatch(listingActions.setSearchLocation(county));
  };
};

export const fetchFeaturedListingData = () => {
  return async (dispatch) => {
    const listData = await fetchProperties({ limit: 3 });
    dispatch(
      listingActions.setList({
        properties: listData || [],
      })
    );
    dispatch(listingActions.isLoading());
  };
};

export const fetchProperty = ({ id }) => {
  return async (dispatch) => {
    const singleProperty = await fetchSingleProperty({ id });
    dispatch(listingActions.setProperty(singleProperty));
  };
};

export const fetchSavedIds = ({ userId }) => {
  const q = query(colRef, where('uid', '==', `${userId}`));

  return async (dispatch) => {
    onSnapshot(q, (snapshot) => {
      let userData = [];
      snapshot.forEach((doc) => {
        userData.push({ ...doc.data(), id: doc.id });
      });
      console.log('userData', userData);

      if (userData.length === 0) {
        return;
      } else {
        dispatch(listingActions.setSavedIds({ savedIds: userData[0].saved }));
        dispatch(listingActions.setUserId({ userId: userData[0].id }));
      }
    });
  };
};
export const fetchSavedProperty = ({ savedIds }) => {
  return async (dispatch) => {
    if (savedIds.length === 0) {
      return;
    } else {
      fetchMultipleProperty({ savedIds: savedIds }).then((data) => {
        console.log(data.data);
        dispatch(
          listingActions.setSavedList({
            savedProperties: data.data,
          })
        );
      });
    }
  };
};

export const listingActions = listingSlice.actions;

export default listingSlice;
