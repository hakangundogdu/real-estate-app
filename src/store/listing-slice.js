import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const listingSlice = createSlice({
  name: 'listing',
  initialState: {
    items: [],
  },
  reducers: {
    setList(state, action) {
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

// export const fetchCartData = () => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       const response = await fetch(
//         'https://redux-cart-37604-default-rtdb.firebaseio.com/cart.json'
//       );

//       if (!response.ok) {
//         throw new Error('Could not fetch cart data!');
//       }

//       const data = await response.json();

//       return data;
//     };

//     try {
//       const cartData = await fetchData();
//       dispatch(
//         cartActions.replaceCart({
//           items: cartData.items || [],
//           totalQuantity: cartData.totalQuantity,
//         })
//       );
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           status: 'error',
//           title: 'Error!',
//           message: 'Fetching cart data failed!',
//         })
//       );
//     }
//   };
// };

export const listingActions = listingSlice.actions;

export default listingSlice;
