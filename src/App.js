import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Properties from './pages/Properties';
import LoginPage from './pages/LoginPage';
import SavedPage from './pages/SavedPage';
import SignupPage from './pages/SignupPage';
import PropertyDetail from './pages/PropertyDetail';
import NotFound from './pages/NotFound';

import {
  fetchFeaturedListingData,
  listingActions,
} from './store/listing-slice';
import { login, logout } from './store/user-slice';
import { auth } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        console.log('app', auth.currentUser.email);
        dispatch(login({ user: auth.currentUser.email }));
        // user is logged in, send the user's details to redux, store the current user in the state
      } else {
        dispatch(logout());
        console.log('app', auth.currentUser);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(listingActions.isLoading());
    dispatch(fetchFeaturedListingData());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/properties/:listing_id" element={<PropertyDetail />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/saved" element={<SavedPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
