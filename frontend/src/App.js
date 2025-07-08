// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import BookingForm from './BookingForm';
import HotelSearchResults from './HotelSearchResults';
import BookingListModal from './components/BookingListModal';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotelbooking" element={<HomePage />} />
        <Route path="/hotelbooking/hotelbookingapplication" element={<BookingForm />} />
        <Route path="/search-hotels" element={<HotelSearchResults />} />
        <Route path="/bookings" element={<BookingListModal />} />
      </Routes>
    </Router>
  );
}

export default App;
