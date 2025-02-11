import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import BlogPost from '@/models/BlogPost';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/MEL', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Database connection error');
  }
};

// GET request handler
export async function GET() {
  await connectDB();
  try {
    const posts = await BlogPost.find();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST request handler
export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();
    const { title, content, author, image, tags } = body;

    if (!title || !content || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newBlog = await BlogPost.create({
      title,
      content,
      author,
      image: image || '/default-blog-image.jpg',
      tags: tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Failed to create blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}