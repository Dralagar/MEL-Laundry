// routes/blog.js
import express from 'express';
import BlogPost from '../models/BlogPost.js';

const router = express.Router();

// Create a blog post
router.post('/create', async (req, res) => {
  const { title, content } = req.body;
  const post = new BlogPost({ title, content });
  await post.save();

  res.status(201).json({ message: 'Blog post created', post });
});

// Get all blog posts
router.get('/', async (req, res) => {
  const posts = await BlogPost.find();
  res.json(posts);
});

// Update a blog post
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await BlogPost.findByIdAndUpdate(id, { title, content }, { new: true });

  res.json({ message: 'Blog post updated', post });
});

// Delete a blog post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await BlogPost.findByIdAndDelete(id);

  res.json({ message: 'Blog post deleted' });
});

export default router;
