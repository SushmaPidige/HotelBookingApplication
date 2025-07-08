const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Allow CORS from frontend
// app.use(cors({
//   origin: 'http://localhost:3000', // your React app URL
//   methods: ['GET', 'POST'],
//   credentials: true
// }));

aapp.use(cors({
  origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api', require('./routes/bookings'));
app.use('/api', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
