// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+@.+\..+/, 'Please enter a valid email']
  },
  checkIn: {
    type: Date,
    required: [true, 'Check-in date is required']
  },
  checkOut: {
    type: Date,
    required: [true, 'Check-out date is required']
  },
  roomType: {
    type: String,
    required: [true, 'Room type is required'],
    enum: ['Single', 'Double', 'Suite']
  },
  username: {
    type: String,
    required: [true, 'Username is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
