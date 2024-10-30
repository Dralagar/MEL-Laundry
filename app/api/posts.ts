import { NextResponse } from 'next/server';
import mongoose, { ConnectOptions, Error } from 'mongoose';
import BlogPost from '../../server/models/BlogPost';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blogDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Database connection error');
  }
};

export async function GET() {
  await connectDB();
  try {
    const blogs = await BlogPost.find();
    return NextResponse.json(blogs);
  } catch (error: unknown) {
    console.error('Failed to fetch blogs:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

interface BlogPostRequestBody {
  title: string;
  content: string;
  author: string;
  image?: string;
}

export async function POST(request: Request) {
  await connectDB();
  try {
    const body: BlogPostRequestBody = await request.json();
    const { title, content, author, image } = body;

    if (!title || !content || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newBlog = await BlogPost.create({
      title,
      content,
      author,
      image: image || null,
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: unknown) {
    console.error('Failed to create blog:', error);
    if (error instanceof Error.ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  await connectDB();
  try {
    const body: BlogPostRequestBody & { id: string } = await request.json();
    const { id, title, content, author, image } = body;

    if (!id || !title || !content || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedBlog = await BlogPost.findByIdAndUpdate(
      id,
      { title, content, author, image: image || null },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error: unknown) {
    console.error('Failed to update blog:', error);
    if (error instanceof Error.ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
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
  } catch (error: unknown) {
    console.error('Failed to delete blog:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}