const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FILE_PATH = path.join(__dirname, '../data/users.json');

router.post('/register', (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, '[]');

  const users = JSON.parse(fs.readFileSync(FILE_PATH));
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  users.push({ firstName, lastName, username, password });
  fs.writeFileSync(FILE_PATH, JSON.stringify(users));
  res.json({ message: 'Registration successful! Please Login now' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = fs.existsSync(FILE_PATH) ? JSON.parse(fs.readFileSync(FILE_PATH)) : [];
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
