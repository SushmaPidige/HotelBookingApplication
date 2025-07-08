import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Hotel list to derive price based on city and type
const hotels = [
  { city: 'Bangalore', type: 'Single', price: 2000 },
  { city: 'Hyderabad', type: 'Double', price: 2500 },
  { city: 'Chennai', type: 'Suite', price: 4000 },
  { city: 'Delhi', type: 'Single', price: 1800 },
  { city: 'Kerala', type: 'Double', price: 2200 },
  { city: 'Indore', type: 'Suite', price: 3500 },
  { city: 'Mumbai', type: 'Double', price: 3000 },
  { city: 'Goa', type: 'Single', price: 2700 },
  { city: 'Gandhi Nagar', type: 'Suite', price: 4200 },
  { city: 'Gurgaon', type: 'Double', price: 2900 },
];

function BookingForm() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const selectedCity = state?.city || '';
  const selectedType = state?.type || 'Single';

  const getPrice = (city, type) => {
    const match = hotels.find(h => h.city === city && h.type === type);
    return match ? match.price : 0;
  };

  // const [roomType, setRoomType] = useState(selectedType);
  const [roomType] = useState(selectedType);
  const [price, setPrice] = useState(getPrice(selectedCity, selectedType));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    roomType: selectedType,
    price: getPrice(selectedCity, selectedType),
    username: localStorage.getItem('loggedInUser') || '',
  });

  useEffect(() => {
    const newPrice = getPrice(selectedCity, roomType);
    setFormData(prev => ({ ...prev, roomType, price: newPrice }));
    setPrice(newPrice);
  }, [roomType, selectedCity]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');

      setMessage(data.message);
      setTimeout(() => navigate('/bookings'), 1500);
    } catch (err) {
      console.error('Error:', err.message);
      setMessage('Booking failed: ' + err.message);
    }
  };

  const [message, setMessage] = useState('');

  const labelStyle = {
    fontWeight: 'bold',
    textAlign: 'right',
    width: '100px',
    marginRight: '1rem',
  };

  // const inputStyle = {
  //   padding: '0.6rem 1rem',
  //   fontSize: '1rem',
  //   border: '1px solid #ccc',
  //   borderRadius: '8px',
  //   width: '100%',
  //   maxWidth: '280px',
  // };

  const inputStyle = {
  padding: '0.2rem 0.8rem',  // ⬅️ smaller vertical padding
  fontSize: '0.9rem',        // optional: reduce font size a bit
  border: '1px solid #ccc',
  borderRadius: '6px',
  width: '100%',
  maxWidth: '200px',         // optional: reduce width slightly
  marginTop: 0,
  marginBottom: 0,
};

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2 style={{ marginBottom: '0.5rem', color: '#2c3e50' }}>SkyView Hotel</h2>
      <p style={{ marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Book your stay at our premium hotel now
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          background: '#ffffffdd',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          maxWidth: '350px',
          margin: '0 auto',
        }}
      >
        {[
          { id: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name' },
          { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
          { id: 'checkIn', label: 'Check-In', type: 'date' },
          { id: 'checkOut', label: 'Check-Out', type: 'date' },
        ].map(({ id, label, type, placeholder }) => (
          <div
            key={id}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
          >
            <label htmlFor={id} style={labelStyle}>{label}:</label>
            <input
              id={id}
              type={type}
              value={formData[id]}
              onChange={handleChange}
              required
              placeholder={placeholder}
              style={inputStyle}
            />
          </div>
        ))}

        {/* Price (read-only) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <label htmlFor="price" style={labelStyle}>Price:</label>
          <input
            id="price"
            type="number"
            value={price}
            readOnly
            style={{ ...inputStyle, backgroundColor: '#f5f5f5' }}
          />
        </div>

        {/* Type (dropdown)
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <label htmlFor="roomType" style={labelStyle}>Type:</label>
          <select
            id="roomType"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            style={{ ...inputStyle, appearance: 'none' }}
            required
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
          </select>
        </div> */}

        {/* Type (plain text) */}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
  <label htmlFor="roomType" style={labelStyle}>Type:</label>
  <div
    id="roomType"
    style={{ ...inputStyle, paddingTop: '0.2rem', paddingBottom: '0.2rem', border: '1px solid #ccc', borderRadius: '6px', backgroundColor: '#f5f5f5' }}
  >
    {roomType}
  </div>
</div>



        <button
          type="submit"
          style={{
            padding: '0.4rem 0.8rem',
            background: '#4CAF50',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            marginTop: '1rem',
            transition: '0.3s ease',
          }}
        >
          Book Now
        </button>
      </form>

      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
    </div>
  );
}

export default BookingForm;
