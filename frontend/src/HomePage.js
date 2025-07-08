import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

import single_room from './assets/single_room.jpg';
import presidential_suite from './assets/presidential_suite.jpg';
import double_room from './assets/double_room.jpeg';
import LoginModal from './components/LoginModal';
import BookingListModal from './components/BookingListModal';

function HomePage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [pendingBooking, setPendingBooking] = useState(null); // ✅ holds booking intent
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  // ✅ After login, navigate to booking if user had clicked booking earlier
  useEffect(() => {
    if (username && pendingBooking) {
      navigate('/hotelbooking/hotelbookingapplication', {
        state: pendingBooking,
      });
      setPendingBooking(null);
    }
  }, [username, pendingBooking, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUsername('');
    alert('Logout successful');
    navigate('/');
  };

  const handleBookClick = (type, city, price) => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
      setPendingBooking({ type, city, price }); // ✅ store for after login
      setShowLoginModal(true);
      return;
    }

    navigate('/hotelbooking/hotelbookingapplication', {
      state: { type, city, price },
    });
  };

  return (
    <div className="home-wrapper">
      {/* ✅ Top Bar */}
      <div className="top-bar">
        <h2 className="logo">The SkyView Hotels</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {username && (
            <span style={{ fontWeight: 'bold', color: '#333' }}>{username}</span>
          )}
          {username ? (
            <>
              <button className="login-button" onClick={() => navigate('/bookings')}>Bookings</button>
              <button className="login-button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button className="login-button" onClick={() => setShowLoginModal(true)}>Login</button>
          )}
        </div>
      </div>

      {/* ✅ Hero Section */}
      <div className="hero-section">
        <h1>Welcome to The SkyView Hotels</h1>
        <p>Book your dream stay with comfort and class.</p>

        {/* 🔍 Search Bar */}
        <div className="search-bar-container">
          <div className="search-bar-wrapper" onClick={() => navigate('/search-hotels')}>
            <input
              type="text"
              className="search-bar"
              placeholder="Search more hotels here"
              readOnly
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </div>

      {/* 🖼️ Image Gallery */}
      <div className="image-gallery">
        <div className="image-container">
          <img src={single_room} alt="Single Room" className="gallery-image" />
          <div className="image-overlay">
            <button
              className="book-btn"
              onClick={() => handleBookClick('Single', 'Bangalore', 2000)}
            >
              Book Single Room in Hyderabad
            </button>
          </div>
        </div>

        <div className="image-container">
          <img src={double_room} alt="Double Room" className="gallery-image" />
          <div className="image-overlay">
            <button
              className="book-btn"
              onClick={() => handleBookClick('Double', 'Hyderabad', 2500)}
            >
              Book Double Room in Hyderabad
            </button>
          </div>
        </div>

        <div className="image-container">
          <img src={presidential_suite} alt="Presidential Suite" className="gallery-image" />
          <div className="image-overlay">
            <button
              className="book-btn"
              onClick={() => handleBookClick('Suite', 'Chennai', 4000)}
            >
              Book Presidential Suite in Hyderabad
            </button>
          </div>
        </div>
      </div>

      {/* 🔐 Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => {
            setShowLoginModal(false);
            const updatedUser = localStorage.getItem('loggedInUser');
            if (updatedUser) setUsername(updatedUser); // ✅ triggers redirect in useEffect
          }}
        />
      )}

      {/* 📋 Bookings Modal if path is /bookings */}
      {location.pathname === '/bookings' && username && (
        <BookingListModal username={username} />
      )}
    </div>
  );
}

export default HomePage;
