// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); 
const path = require('path');
const connectDB = require('./config/db');

// Routes
const commentRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); 
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);

// Serve static files 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Test route
app.get('/', (req, res) => {
  res.send('MERN Blog API is running');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
