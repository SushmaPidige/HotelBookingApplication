// src/components/BookingListModal.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginModal.css';

function BookingListModal() {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const username = localStorage.getItem('loggedInUser');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/bookings?username=${username}`);
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchBookings();
    else setLoading(false);
  }, [username]);

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleCheckboxChange = (bookingId) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      newSet.has(bookingId) ? newSet.delete(bookingId) : newSet.add(bookingId);
      return newSet;
    });
  };

  const deleteSelectedBookings = async () => {
    if (selected.size === 0) return;

    const confirm = window.confirm('Are you sure you want to delete selected bookings?');
    if (!confirm) return;

    try {
      const res = await fetch('http://localhost:5001/api/bookings/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingIds: Array.from(selected) })
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setBookings((prev) => prev.filter((b) => !selected.has(b.bookingId)));
      setSelected(new Set());
      alert('Selected bookings deleted successfully!');
    } catch (err) {
      alert('Error deleting bookings: ' + err.message);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxHeight: '90vh', overflowY: 'auto', textAlign: 'left' }}>
        <button className="close-btn" onClick={() => navigate('/')}>×</button>
        <h2 style={{ textAlign: 'center' }}>Your Bookings</h2>

        {loading ? (
          <p>Loading bookings...</p>
        ) : !username ? (
          <p>Please log in to view bookings.</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <>
            {selected.size > 0 && (
              <button
                onClick={deleteSelectedBookings}
                style={{
                  margin: '1rem auto',
                  display: 'block',
                  padding: '0.5rem 1.2rem',
                  background: 'crimson',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Delete Selected
              </button>
            )}

            {bookings.map((b, index) => (
              <div
                key={index}
                style={{
                  padding: '1rem',
                  borderRadius: '20px',
                  marginBottom: '2rem',
                  background: 'linear-gradient(135deg, #b2fefa, #e0ffff)',
                  lineHeight: '0.8',
                  border: '1px solid #b2fefa',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  position: 'relative'
                }}
              >
                <div>
                  <p><strong>Booking ID:</strong> {b.bookingId}</p>
                  <p><strong>Booked by:</strong> {b.name}</p>
                  <p><strong>Type:</strong> {b.roomType}</p>
                  <p><strong>Phone:</strong> {b.phone || `+91-9XXX-XXXX${index}`}</p>
                  <p><strong>Amenities:</strong> WiFi, Geyser</p>
                  <p><strong>Price:</strong> ₹{b.price || '2000'}</p>
                  <p><strong>Check-In:</strong> {formatDateTime(b.checkIn)}</p>
                  <p><strong>Check-Out:</strong> {formatDateTime(b.checkOut)}</p>
                </div>

                <input
                  type="checkbox"
                  checked={selected.has(b.bookingId)}
                  onChange={() => handleCheckboxChange(b.bookingId)}
                  style={{ width: '10px', height: '10px', marginLeft: '1rem', marginTop: '5px' }}
                  title="Select booking"
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default BookingListModal;
