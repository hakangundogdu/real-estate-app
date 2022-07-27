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
      state.savedProperties = action.payload.properties;
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

export const fetchSavedProperty = ({ userId }) => {
  const q = query(colRef, where('uid', '==', `${userId}`));

  return async (dispatch) => {
    onSnapshot(q, (snapshot) => {
      let userData = [];
      snapshot.forEach((doc) => {
        userData.push(doc.data());
      });
      fetchMultipleProperty({ savedIds: userData[0].saved }).then((data) => {
        dispatch(
          listingActions.setSavedList({
            properties: data.data,
          })
        );
      });
    });
  };
};

export const saveFavourites = ({ user, property }) => {
  return async (dispatch) => {
    const favCollectionRef = collection(db, 'favourites');
    const propertyData = {
      user: user,
      listing_status: property.listing_status,
      listing_id: property.listing_id,
      title: property.title,
      price: property.price,
      image_645_430_url: property.image_645_430_url,
      image_354_255_url: property.image_354_255_url,
      num_bedrooms: property.num_bedrooms,
      num_bathrooms: property.num_bathrooms,
      latitude: property.latitude,
      longitude: property.longitude,
      displayable_address: property.displayable_address,
    };

    const saveProperty = async () => {
      await addDoc(favCollectionRef, propertyData);
    };

    try {
      await saveProperty();
    } catch (error) {
      console.log(error);
    }
  };
};

// export const deleteFavourite = (id) => {
//   return async (dispatch) => {
//     const devFavRef = doc(db, 'favourites', id);

//     const delSaved = async () => {
//       await deleteDoc(devFavRef);
//     };
//     try {
//       await delSaved();
//     } catch (error) {}
//   };
// };

export const listingActions = listingSlice.actions;

export default listingSlice;
