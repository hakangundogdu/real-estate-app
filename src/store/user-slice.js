import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    firstname: null,
    lastname: null,
    email: null,
  },
  reducers: {
    setUser(state, action) {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.isLogin = true;
    },
    setUserLogout(state) {
      state.firstname = null;
      state.lastname = null;
      state.email = null;
      state.isLogin = false;
    },
  },
});

export const { setUser, setUserLogout } = userSlice.actions;

export default userSlice;
