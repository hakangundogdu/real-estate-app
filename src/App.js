import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
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
  const userId = useSelector((state) => state.user.uid);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login({ uid: auth.currentUser.uid }));
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(listingActions.isLoading());
    dispatch(fetchFeaturedListingData());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/properties/:id" element={<PropertyDetail />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/saved"
        element={userId ? <SavedPage /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
