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
    .then(() => {
      console.log('MongoDB connected successfully');
      isDbConnected = true;
    })
    .catch(err => {
      console.error('MongoDB connection error:', err.message);
      console.log('Continuing without database connection...');
    });

  mongoose.connection.on('connected', () => {
    isDbConnected = true;
    console.log('MongoDB connection established');
  });

  mongoose.connection.on('disconnected', () => {
    isDbConnected = false;
    console.log('MongoDB connection disconnected');
  });

  mongoose.connection.on('error', (err) => {
    isDbConnected = false;
    console.error('MongoDB connection error:', err.message);
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

// Create default admin user if not exists
app.post('/api/users/create-admin', async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }

    const adminUser = new User({
      username: 'admin',
      password: 'meladmin2024', // Change this in production!
      role: 'admin'
    });
    
    await adminUser.save();
    res.status(201).json({ 
      message: 'Admin user created successfully',
      username: 'admin',
      password: 'meladmin2024'
    });
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
app.get('/api/locations', async (req, res) => {
  // Return fallback data if database is not connected
  if (!isDbConnected) {
    return res.json([{
      _id: '1',
      name: 'MEL Laundry - Donholm CFF',
      address: 'Donholm CFF Plaza, Ground Floor',
      city: 'Nairobi',
      state: 'Nairobi County',
      zipCode: '00100',
      image: '/images/inside.jpg',
      status: 'active',
      phone: '+254 769 003443',
      hours: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM',
      description: 'Our flagship location offering premium laundry services with state-of-the-art equipment and professional staff.',
      coordinates: { lat: -1.2921, lng: 36.8219 }
    }]);
  }

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
app.get('/api/blogs', async (req, res) => {
  // Return fallback data if database is not connected
  if (!isDbConnected) {
    return res.json([
      {
        _id: '1',
        id: '1',
        title: 'Welcome to MEL Laundry Blog',
        summary: 'Discover professional laundry tips and tricks from our experts.',
        content: 'Welcome to our official blog where we share valuable insights about laundry care, fabric maintenance, and the latest trends in the industry.',
        author: 'MEL Laundry Team',
        date: '2024-01-15',
        image: '/images/blog/welcome.jpg',
        tags: ['laundry', 'tips', 'professional']
      },
      {
        _id: '2',
        id: '2',
        title: 'How to Care for Delicate Fabrics',
        summary: 'Learn the best practices for washing and maintaining delicate clothing items.',
        content: 'Delicate fabrics require special attention and care. In this guide, we walk you through the process of handling silk, wool, and other sensitive materials.',
        author: 'Sarah Johnson',
        date: '2024-01-10',
        image: '/images/blog/delicate.jpg',
        tags: ['delicate', 'fabrics', 'care']
      },
      {
        _id: '3',
        id: '3',
        title: 'Eco-Friendly Laundry Practices',
        summary: 'Discover sustainable laundry methods that are good for your clothes and the environment.',
        content: 'Making small changes to your laundry routine can have a big impact on the environment. Learn about eco-friendly detergents and energy-saving techniques.',
        author: 'Green Living Team',
        date: '2024-01-05',
        image: '/images/blog/eco.jpg',
        tags: ['eco-friendly', 'sustainability', 'environment']
      }
    ]);
  }

  try {
    const blogs = await BlogPost.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  // Return fallback data if database is not connected
  if (!isDbConnected) {
    const fallbackBlogs = [
      {
        _id: '1',
        id: '1',
        title: 'Welcome to MEL Laundry Blog',
        summary: 'Discover professional laundry tips and tricks from our experts.',
        content: 'Welcome to our official blog where we share valuable insights about laundry care, fabric maintenance, and the latest trends in the industry. Our team of experts is dedicated to helping you achieve the best results for your clothing while extending their lifespan.',
        author: 'MEL Laundry Team',
        date: '2024-01-15',
        image: '/images/blog/welcome.jpg',
        tags: ['laundry', 'tips', 'professional']
      }
    ];
    
    const blog = fallbackBlogs.find(b => b._id === req.params.id || b.id === req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    return res.json(blog);
  }

  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/blogs', authenticateToken, ensureDbConnected, upload.single('image'), async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);

  try {
    const blog = new BlogPost({
      title: req.body.title,
      content: req.body.content,
      summary: req.body.summary,
      author: req.body.author || 'MEL Laundry Team',
      date: req.body.date || new Date().toISOString().split('T')[0],
      tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
      status: req.body.status || 'draft',
      image: req.file ? req.file.path : null
    });

    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/blogs/:id', authenticateToken, ensureDbConnected, async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Update fields
    if (req.body.title != null) blog.title = req.body.title;
    if (req.body.content != null) blog.content = req.body.content;
    if (req.body.summary != null) blog.summary = req.body.summary;
    if (req.body.author != null) blog.author = req.body.author;
    if (req.body.date != null) blog.date = req.body.date;
    if (req.body.tags != null) {
      blog.tags = Array.isArray(req.body.tags) 
        ? req.body.tags 
        : req.body.tags.split(',').map(tag => tag.trim());
    }
    if (req.body.status != null) blog.status = req.body.status;
    if (req.file) blog.image = req.file.path;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    console.error('Error updating blog:', err);
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

// Email route with Resend
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailContent = `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
    `;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: ['support@mellaundry.com'], // Replace with your actual email
      subject: `Contact Form: ${subject}`,
      text: emailContent,
    });

    res.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email' 
    });
  }
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
