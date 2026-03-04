import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local from the parent directory
dotenv.config({ path: join(__dirname, '..', '.env.local') });

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import path from 'path';
import BlogPost from './models/BlogPost.js';
import Location from './models/Location.js';
import User from './models/User.js';

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

// Serve static files from 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Connect to MongoDB (optional in dev if URI is missing),
// but track connectivity so API routes can respond clearly.
// Fall back to a local MongoDB instance if MONGODB_URI is not set.
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mel-laundry';
let isDbConnected = false;

if (!mongoUri) {
  console.warn('MONGODB_URI is not set. Database-dependent routes will be unavailable.');
} else {
  console.log('MongoDB URI:', mongoUri);
  mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

  mongoose.connection.on('connected', () => {
    isDbConnected = true;
  });

  mongoose.connection.on('disconnected', () => {
    isDbConnected = false;
  });

  mongoose.connection.on('error', () => {
    isDbConnected = false;
  });
}

// Middleware to ensure database is available for DB-dependent routes
const ensureDbConnected = (req, res, next) => {
  if (!mongoUri) {
    return res.status(503).json({
      message: 'Database is not configured on this server (missing MONGODB_URI).',
    });
  }

  if (!isDbConnected) {
    return res.status(503).json({
      message: 'Database is currently unavailable. Please try again later.',
    });
  }

  next();
};

// Basic health route
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    port,
    dbConfigured: !!mongoUri,
    dbConnected: isDbConnected,
  });
});

// User routes (simplified without bcrypt for now)
app.post('/api/users/register', ensureDbConnected, async (req, res) => {
  try {
    // For now, store password as plain text (NOT PRODUCTION READY)
    const user = new User({
      username: req.body.username,
      password: req.body.password, // TODO: Add bcrypt back when space allows
      role: req.body.role || 'admin'
    });
    const newUser = await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/api/users/login', ensureDbConnected, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    // Simple password comparison (NOT PRODUCTION READY)
    if (req.body.password === user.password) {
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );
      res.json({ token });
    } else {
      res.status(400).json({ message: 'Invalid password' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Locations routes
app.get('/api/locations', ensureDbConnected, async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/locations', authenticateToken, ensureDbConnected, async (req, res) => {
  const location = new Location({
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    image: req.body.image,
    status: req.body.status
  });

  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/locations/:id', authenticateToken, ensureDbConnected, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid location ID' });
    }

    // Prepare update data
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path;
    }

    const location = await Location.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { 
        new: true,
        runValidators: true
      }
    );

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.json(location);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error updating location' });
  }
});

app.delete('/api/locations/:id', authenticateToken, ensureDbConnected, async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    await location.deleteOne();
    res.json({ message: 'Location deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Blog routes
app.get('/api/blogs', ensureDbConnected, async (req, res) => {
  try {
    const blogs = await BlogPost.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/blogs/:id', ensureDbConnected, getBlog, (req, res) => {
  res.json(res.blog);
});

app.post('/api/blogs', authenticateToken, ensureDbConnected, upload.single('image'), async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);

  const blog = new BlogPost({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    image: req.file ? req.file.path : null
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/blogs/:id', authenticateToken, ensureDbConnected, getBlog, async (req, res) => {
  if (req.body.title != null) {
    res.blog.title = req.body.title;
  }
  if (req.body.content != null) {
    res.blog.content = req.body.content;
  }
  if (req.body.author != null) {
    res.blog.author = req.body.author;
  }
  try {
    const updatedBlog = await res.blog.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/blogs/:id', authenticateToken, ensureDbConnected, getBlog, async (req, res) => {
  try {
    await res.blog.deleteOne();
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getBlog(req, res, next) {
  let blog;
  try {
    blog = await BlogPost.findById(req.params.id);
    if (blog == null) {
      return res.status(404).json({ message: 'Cannot find blog post' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.blog = blog;
  next();
}

// Add error handling for routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Enhance error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  
  // Handle Next.js specific errors
  if (err.code === 'ENOENT') {
    return res.status(404).json({ message: 'Resource not found' });
  }

  // Default error response
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Email route disabled for now (resend package not available)
app.post('/api/send-email', authenticateToken, async (req, res) => {
  res.status(503).json({ 
    success: false, 
    message: 'Email service temporarily disabled' 
  });
});

app.listen(port, () => {
  console.log(`Welcome Dralagar, @ReactNow , Server is running on http://localhost:${port}`);
});

// Global error handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});