import { createSlice } from '@reduxjs/toolkit';

const retrieveStoredUid = () => {
  const storedUid = localStorage.getItem('uid');
  return storedUid ? storedUid : null;
};
const userSlice = createSlice({
  name: 'user',
  initialState: {
    uid: retrieveStoredUid(),
    isLoggedIn: !!retrieveStoredUid(),
  },
  reducers: {
    login(state, action) {
      state.uid = action.payload.uid;
      localStorage.setItem('uid', state.uid);
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('uid');
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice;
