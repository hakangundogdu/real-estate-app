import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Properties from './pages/Properties';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PropertyDetail from './pages/PropertyDetail';
import NotFound from './pages/NotFound';

import {
  fetchFeaturedListingData,
  listingActions,
} from './store/listing-slice';

function App() {
  const dispatch = useDispatch();

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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
