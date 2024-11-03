import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import BlogPost from '@/models/BlogPost';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/MEL');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Database connection error');
  }
};

export async function GET() {
  await connectDB();
  try {
    const blogs = await BlogPost.find().sort({ date: -1 });
    const formattedBlogs = blogs.map((blog: any) => ({
      id: blog._id.toString(),
      title: blog.title,
      summary: blog.content.substring(0, 200) + '...', // Create summary from content
      author: blog.author,
      image: blog.image || '/default-blog-image.jpg',
      date: blog.createdAt.toISOString().split('T')[0],
      tags: blog.tags || [],
    }));
    return NextResponse.json(formattedBlogs);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
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