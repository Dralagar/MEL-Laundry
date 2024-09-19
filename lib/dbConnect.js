import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in your .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If there is already a cached connection, return it
  if (cached.conn) {
    console.log('Using existing MongoDB connection');
    return cached.conn;
  }

  // If there is no existing promise for connection, create a new one
  if (!cached.promise) {
    console.log('Creating a new MongoDB connection');
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      console.log('MongoDB connected');
      return mongoose;
    }).catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      throw new Error('Failed to connect to MongoDB');
    });
  }

  // Wait for the promise to resolve and cache the connection
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
