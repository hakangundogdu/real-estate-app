import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Auth from './pages/Auth';
import PropertyDetail from './pages/PropertyDetail';
import NotFound from './pages/NotFound';

import { fetchListingData } from './store/listing-slice';

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchListingData());
  // }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/properties/:listing_id" element={<PropertyDetail />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
