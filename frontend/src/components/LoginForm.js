import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import single_room from './assets/single_room.jpg';
import presidential_suite from './assets/presidential_suite.jpg';
import double_room from './assets/double_room.jpeg';

function HomePage() {
  return (
    <div className="home-wrapper">
      <div className="top-bar">
        <h2 className="logo">The SkyView Hotels</h2>
        <Link to="/hotelbooking/hotelbookingapplication">
          <button className="login-button">Login</button>
        </Link>
      </div>

      <div className="hero-section">
        <h1>Welcome to The SkyView Hotels</h1>
        <p>Book your dream stay with comfort and class.</p>
      </div>

      <div className="image-gallery">
        <div className="image-container">
          <img src={single_room} alt="Single Room" className="gallery-image" />
          <div className="image-overlay">
            <Link to="/hotelbooking/hotelbookingapplication">Book Single Room</Link>
          </div>
        </div>

        <div className="image-container">
          <img src={double_room} alt="Double Room" className="gallery-image" />
          <div className="image-overlay">
            <Link to="/hotelbooking/hotelbookingapplication">Book Double Room</Link>
          </div>
        </div>

        <div className="image-container">
          <img src={presidential_suite} alt="Presidential Suite" className="gallery-image" />
          <div className="image-overlay">
            <Link to="/hotelbooking/hotelbookingapplication">Book Presidential Suite</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
