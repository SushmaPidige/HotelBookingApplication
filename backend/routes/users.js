const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({ firstName, lastName, username, password });
    await newUser.save();
    res.status(201).json({ message: 'Registration successful...Please Login now' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });

    if (!foundUser || foundUser.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
