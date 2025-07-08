const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    console.log('✅ Received booking data:', req.body);

    const booking = new Booking(req.body);
    const result = await booking.save();

    console.log('✅ Booking saved:', result);

    res.status(201).json({ message: 'Booking successful!' });
  } catch (err) {
    console.error('❌ Error while saving booking:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createBooking };
