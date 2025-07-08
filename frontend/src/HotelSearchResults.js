import React, { useState } from 'react';
import './HotelSearchResults.css';
import { useNavigate } from 'react-router-dom';
import LoginModal from './components/LoginModal';

import bangaloreImg from './assets/bangalore.jpeg';
import bangaloreImg2 from './assets/bangalore2.png';
import bangaloreImg3 from './assets/bangalore3.jpeg';

import hyderabadImg from './assets/hyderabad.jpg';
import hyderabadImg2 from './assets/hyderabad2.jpg';
import hyderabadImg3 from './assets/hyderabad3.jpg';

import chennaiImg from './assets/chennai.jpeg';
import chennaiImg2 from './assets/chennai.jpeg';
import chennaiImg3 from './assets/chennai.jpeg';

import delhiImg from './assets/delhi.jpeg';
import delhiImg2 from './assets/delhi2.jpeg';
import delhiImg3 from './assets/delhi3.jpeg';

import keralaImg from './assets/kerala.jpg';
import keralaImg2 from './assets/kerala2.jpeg';
import keralaImg3 from './assets/kerala3.jpeg';

import indoreImg from    './assets/indore.jpg';
import indoreImg2 from    './assets/indore2.jpeg';
import indoreImg3 from    './assets/indore3.jpeg';

import mumbaiImg from './assets/mumbai.webp';
import mumbaiImg2 from './assets/mumbai2.jpeg';
import mumbaiImg3 from './assets/mumbai3.jpeg';

import goaImg from './assets/goa.webp';
import goaImg2 from './assets/goa2.jpg';
import goaImg3 from './assets/goa3.jpeg';

import gandhinagarImg from './assets/gandhinagar.jpg';
import gandhinagarImg2 from './assets/gandhinagar2.jpeg';
import gandhinagarImg3 from './assets/gandhinagar3.jpeg';

import gurgaonImg from './assets/gurgaon.jpg';
import gurgaonImg2 from './assets/gurgaon2.jpeg';
import gurgaonImg3 from './assets/gurgaon3.jpeg';

const hotels = [
  { city: 'Bangalore', type: 'Single', phone: '9876543210', amenities: 'Lounge, Geyser', price: '₹2000', status: 'Available', image: bangaloreImg },
  { city: 'Bangalore', type: 'Double', phone: '9876543210', amenities: 'WiFi, Geyser', price: '₹2500', status: 'Available', image: bangaloreImg2 },
  { city: 'Bangalore', type: 'Suite', phone: '9871543210', amenities: 'Balcony, Geyser', price: '₹3000', status: 'Available', image: bangaloreImg3 },
  
  { city: 'Hyderabad', type: 'Suite', phone: '9123456780', amenities: 'Lounge, Balcony', price: '₹2500', status: 'Available', image: hyderabadImg },
  { city: 'Hyderabad', type: 'Double', phone: '9123458780', amenities: 'BreakFast, Balcony', price: '₹3000', status: 'Available', image: hyderabadImg2 },
  { city: 'Hyderabad', type: 'Single', phone: '9123456780', amenities: 'Lounge, Geyser', price: '₹3500', status: 'Not Available', image: hyderabadImg3 },

  { city: 'Chennai', type: 'Suite', phone: '9988776655', amenities: 'Lounge, Dinner', price: '₹4000', status: 'Available', image: chennaiImg },
  { city: 'Chennai', type: 'Double', phone: '99885776655', amenities: 'BreakFast, Dinner', price: '₹4200', status: 'Not Available', image: chennaiImg2 },
  { city: 'Chennai', type: 'Suite', phone: '9988776655', amenities: 'BreakFast, Balcony', price: '₹4500', status: 'Available', image: chennaiImg3 },

    
  { city: 'Delhi', type: 'Single', phone: '9345578901', amenities: 'TV, Geyser', price: '₹1800', status: 'Available', image: delhiImg },
  { city: 'Delhi', type: 'Double', phone: '9345668901', amenities: 'WiFi, Geyser', price: '₹2000', status: 'Available', image: delhiImg2 },
  { city: 'Delhi', type: 'Suite', phone: '9345678901', amenities: 'TV, conditioner', price: '₹3000', status: 'Available', image: delhiImg3 },

  { city: 'Kerala', type: 'Double', phone: '9012335678', amenities: 'WiFi, induction-stove', price: '₹2200', status: 'Available', image: keralaImg  },
  { city: 'Kerala', type: 'Suite', phone: '9012305678', amenities: 'WiFi, Geyser', price: '₹2500', status: 'Available', image: keralaImg2 },
  { city: 'Kerala', type: 'Single', phone: '9012341678', amenities: 'Air-conditioner, induction-stove', price: '₹4200', status: 'Available', image: keralaImg3  },

  { city: 'Indore', type: 'Single', phone: '8765332109', amenities: 'Air-Fridge, Geyser', price: '₹3500', status: 'Available', image: indoreImg  },
  { city: 'Indore', type: 'Suite', phone: '8765435109', amenities: 'Air-conditioner, Geyser', price: '₹4000', status: 'Available', image: indoreImg2 },
  { city: 'Indore', type: 'Double', phone: '8715432109', amenities: 'WiFi, Geyser', price: '₹4000', status: 'Available', image: indoreImg3 },

  { city: 'Mumbai', type: 'Suite', phone: '7654351098', amenities: 'WiFi, Fridge', price: '₹3000', status: ' Available', image: mumbaiImg  },
  { city: 'Mumbai', type: 'Double', phone: '7654321098', amenities: 'Radio, Fridge', price: '₹3200', status: ' Available', image: mumbaiImg2  },
  { city: 'Mumbai', type: 'Single', phone: '7654321098', amenities: 'WiFi, Playground', price: '₹4000', status: 'Not Available', image: mumbaiImg3 },

  { city: 'Goa', type: 'Single', phone: '9958771122', amenities: 'WashingMachine, AC', price: '₹2700', status: 'Available', image: goaImg  },
  { city: 'Goa', type: 'Double', phone: '7652321098', amenities: 'Radio, Fridge', price: '₹3000', status: 'Not Available', image: goaImg2  },
  { city: 'Goa', type: 'Suite', phone: '7654321098', amenities: 'WiFi, Playground', price: '₹3000', status: 'Not Available', image: goaImg3  },
  
  { city: 'Gandhi Nagar', type: 'Single', phone: '9331254789', amenities: 'Playground, Playground', price: '₹4200', status: 'Available', image: gandhinagarImg  },
  { city: 'Gandhi Nagar', type: 'Double', phone: '9329654789', amenities: 'WiFi, WashingMachine', price: '₹4200', status: 'Available', image: gandhinagarImg2  },
  { city: 'Gandhi Nagar', type: 'Suite', phone: '9399634789', amenities: 'Radio, Playground', price: '₹4200', status: 'Available', image: gandhinagarImg3  },
  
  { city: 'Gurgaon', type: 'Suite', phone: '9456122780', amenities: 'WiFi, swimmingpool', price: '₹2900', status: 'Not Available', image: gurgaonImg  },
  { city: 'Gurgaon', type: 'Single', phone: '9456123780', amenities: 'WiFi, swimmingpool', price: '₹2500', status: ' Available', image: gurgaonImg2  },
  { city: 'Gurgaon', type: 'Suite', phone: '9456123780', amenities: 'Radio, WashingMachine',  price: '₹2900', status: 'Available', image: gurgaonImg3 },
];

function HotelSearchResults() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const redirectAfterLogin = () => {
    setShowLoginModal(false);
    navigate('/hotelbooking/hotelbookingapplication');
  };

  const filteredHotels = hotels.filter(hotel =>
    (selectedCity === '' || hotel.city === selectedCity) &&
    (selectedType === '' || hotel.type === selectedType) &&
    (selectedAvailability === '' || hotel.status === 'Available')
  );

  return (
    <div className="search-results-wrapper">
      <h2 className="search-heading">Available Hotels</h2>

      <div className="filters">
        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="">All Cities</option>
          {[...new Set(hotels.map(h => h.city))].map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">All Types</option>
          {[...new Set(hotels.map(h => h.type))].map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select value={selectedAvailability} onChange={(e) => setSelectedAvailability(e.target.value)}>
          <option value="">All Hotels</option>
          <option value="Available">Available Hotels</option>
        </select>
      </div>

      <div className="hotel-list">
        {filteredHotels.map((hotel, index) => (
          <div className="hotel-card" key={index}>
            {hotel.image && (
  <img
    src={hotel.image}
    alt={`${hotel.city} hotel`}
    className="hotel-image"
  />
)}
            <h3>{hotel.city}</h3>
            <p><strong>Type:</strong> {hotel.type}</p>
            <p><strong>Phone:</strong> {hotel.phone}</p>
            <p><strong>Amenities:</strong> {hotel.amenities}</p>
            {/* <p className="hotel-price"><strong>Price:</strong> {hotel.price}</p> */}
            <p>
            <strong>Price:</strong>{' '}
            <span className="hotel-price">{hotel.price}</span>
            </p>
            <p><strong>Status:</strong> {hotel.status}</p>
            <button
              className="book-btn"
              onClick={() => {
                const user = localStorage.getItem('loggedInUser');
                if (!user) {
                  setShowLoginModal(true);
                } else {
                  navigate('/hotelbooking/hotelbookingapplication', {
                    state: {
                      city: hotel.city,
                      type: hotel.type,
                    },
                  });
                }
              }}
            >
              Book This
            </button>
          </div>
        ))}

        {filteredHotels.length === 0 && (
          <p className="no-results">No hotels match your filter.</p>
        )}
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={redirectAfterLogin}
        />
      )}
    </div>
  );
}

export default HotelSearchResults;
