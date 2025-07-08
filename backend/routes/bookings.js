// routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /api/book
router.post('/book', async (req, res) => {
  const { name, email, checkIn, checkOut, roomType, username } = req.body;

  if (!username || !email || !name || !checkIn || !checkOut || !roomType) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const bookingId = 'BKG-' + Math.floor(100000 + Math.random() * 900000); // Generate random booking ID

    const booking = new Booking({
      bookingId, // ← added bookingId
      name,
      email,
      checkIn,
      checkOut,
      roomType,
      username
    });
    

console.log('Saving booking with ID:', bookingId);
    await booking.save();
    console.log('Booking saved:', booking);
    res.status(201).json({ message: 'Booking successful!', bookingId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bookings?username=someone
router.get('/bookings', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const bookings = await Booking.find({ username });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// POST /api/bookings/delete
router.post('/bookings/delete', async (req, res) => {
  const { bookingIds } = req.body;

  if (!Array.isArray(bookingIds) || bookingIds.length === 0) {
    return res.status(400).json({ error: 'No booking IDs provided' });
  }

  try {
    await Booking.deleteMany({ bookingId: { $in: bookingIds } });
    res.json({ message: 'Selected bookings deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
