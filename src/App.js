import { Route, Routes, Navigate, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Auth from './pages/Auth';
import PropertyDetail from './pages/PropertyDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/properties/:propertyId" element={<PropertyDetail />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
