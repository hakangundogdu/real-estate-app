import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { db } from '../firebase-config';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  query,
  where,
} from '@firebase/firestore';

const listingSlice = createSlice({
  name: 'listing',
  initialState: {
    properties: [],
    isLoading: false,
    isSearched: false,
    searchLocation: null,
  },
  reducers: {
    setList(state, action) {
      state.properties = action.payload.properties;
      window.localStorage.setItem(
        'Property List',
        JSON.stringify(state.properties)
      );
    },

    setSearchLocation(state, action) {
      state.searchLocation = action.payload;
    },

    isLoading(state) {
      state.isLoading = !state.isLoading;
    },
    isSearched(state) {
      state.isSearched = !state.isSearched;
    },
  },
});

export const fetchListingData = ({ area, listing_status }) => {
  const params = {
    area: area,
    category: 'residential',
    order_by: 'age',
    ordering: 'descending',
    page_number: '1',
    page_size: '21',
    listing_status: listing_status,
  };

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios({
        method: 'GET',
        url: 'https://zoopla.p.rapidapi.com/properties/list',
        params,
        headers: {
          'x-rapidapi-host': 'zoopla.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_ZOOPLA_API_KEY,
        },
      });

      const { data } = response;
      console.log(data.listing);

      return data;
    };

    const listData = await fetchData();
    dispatch(
      listingActions.setList({
        properties: listData.listing || [],
      })
    );
    dispatch(listingActions.isLoading());
  };
};

export const fetchFeaturedListingData = () => {
  const params = {
    area: 'London',
    category: 'residential',
    order_by: 'age',
    ordering: 'descending',
    page_number: '1',
    page_size: '3',
  };

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios({
        method: 'GET',
        url: 'https://zoopla.p.rapidapi.com/properties/list',
        params,
        headers: {
          'x-rapidapi-host': 'zoopla.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_ZOOPLA_API_KEY,
        },
      });

      const { data } = response;
      console.log(data.listing);
      return data;
    };

    const listData = await fetchData();
    dispatch(
      listingActions.setList({
        properties: listData.listing || [],
      })
    );
    dispatch(listingActions.isLoading());
  };
};

// export const getFavourites = () => {
//   return async (dispatch) => {
//     const q = query(collection(db, 'favourites'), where('user', '==', user));
//     const data = await getDocs(q);

//   };
// };

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
