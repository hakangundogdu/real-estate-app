import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_ZOOPLA_API_KEY;

const listingSlice = createSlice({
  name: 'listing',
  initialState: {
    properties: [],
  },
  reducers: {
    setList(state, action) {
      state.properties = action.payload.properties;
      window.localStorage.setItem(
        'Property List',
        JSON.stringify(state.properties)
      );
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
    page_size: '20',
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
          'x-rapidapi-key': API_KEY,
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
  };
};

export const listingActions = listingSlice.actions;

export default listingSlice;
