import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import BlogPost from '@/models/BlogPost';
import { createClient } from '@sanity/client';
import config from '../../../sanity.config';

// Initialize MongoDB connection
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

// Initialize Sanity client
const client = createClient(config);

// GET request handler
export async function GET() {
  try {
    const posts = await client.fetch(`*[_type == "post"]`);
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

// PUT request handler
export async function PUT(request) {
  await connectDB();
  try {
    const body = await request.json();
    const { id, title, content, author, image, tags } = body;

    if (!id || !title || !content || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedBlog = await BlogPost.findByIdAndUpdate(
      id,
      { title, content, author, image: image || '/default-blog-image.jpg', tags: tags || [] },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Failed to update blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE request handler
export async function DELETE(request) {
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing blog post ID' }, { status: 400 });
    }

    const deletedBlog = await BlogPost.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Failed to delete blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}