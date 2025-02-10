import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import BlogPost from '@/models/BlogPost';
import { createClient } from '@sanity/client';
import config from '../../../sanity.config';




const connectDB = async () => {
  if (mongoose.connection.readyState) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/MEL');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Database connection error');
  }
};

const client = createClient(config);

export async function GET() {
  try {
    const posts = await client.fetch(`*[_type == "post"]`);
    return Response.json(posts);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
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