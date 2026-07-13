require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
const healthRoutes = require('./routes/v1/healthRoutes');
const authRoutes = require('./routes/v1/authRoutes');
const categoryRoutes = require('./routes/v1/categoryRoutes');
const courseRoutes = require('./routes/v1/courseRoutes');
const enrollmentRoutes = require('./routes/v1/enrollmentRoutes');
const uploadRoutes = require('./routes/v1/uploadRoutes');
const adminRoutes = require('./routes/v1/adminRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// 1. Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
})); // Sets HTTP security headers allowing cross-origin assets
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite default port fallback
  credentials: true
}));

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// 2. Request Parsing Middlewares
app.use(express.json()); // Parses incoming JSON payloads
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder as static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// 3. Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Logs requests to the console
}

// 4. API Routes (v1)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the SkillCraft REST API. Server is running successfully!',
    frontendUrl: 'http://localhost:5173',
    version: '1.0.0'
  });
});

app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/enrollments', enrollmentRoutes);
app.use('/api/v1/uploads', uploadRoutes);
app.use('/api/v1/admin', adminRoutes);

// 5. Error Handling Middlewares
// Catch 404 and forward to error handler
app.use(notFound);
// Centralized Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
