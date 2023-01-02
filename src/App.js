import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SavedPage from './pages/SavedPage';
import SignupPage from './pages/SignupPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import NotFound from './pages/NotFound';

import {
  fetchFeaturedListingData,
  listingActions,
  fetchSavedIds,
  fetchSavedProperty,
} from './store/listing-slice';
import { login, logout } from './store/user-slice';

import { auth } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.uid);
  const savedProperties = useSelector((state) => state.listing.savedProperties);
  const savedIds = useSelector((state) => state.listing.savedIds);

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
    dispatch(fetchSavedIds({ userId: userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(fetchSavedProperty({ savedIds: savedIds }));
  }, [dispatch, savedIds]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Home />} />
      <Route path="/properties/:id" element={<PropertyDetailPage />} />
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
