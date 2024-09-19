import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String, // This field will store the path or URL of the image
    default: null // Optional: if you want to set a default value, otherwise, it can be null
  }
});

export default mongoose.model('BlogPost', BlogPostSchema);
