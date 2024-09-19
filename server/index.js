import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import BlogPost from './models/BlogPost.js';
import Location from './models/Location.js'; // Default import

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/Mel.blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Locations routes
app.get('/api/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/locations', async (req, res) => {
  const location = new Location({
    name: req.body.name,
    address: req.body.address
  });

  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Blog routes
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await BlogPost.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/blogs/:id', getBlog, (req, res) => {
  res.json(res.blog);
});

app.post('/api/blogs', upload.single('image'), async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);

  const blog = new BlogPost({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    image: req.file ? req.file.path : null // Save image path
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/blogs/:id', getBlog, async (req, res) => {
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

app.delete('/api/blogs/:id', getBlog, async (req, res) => {
  try {
    await res.blog.remove();
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
