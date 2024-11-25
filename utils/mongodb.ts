import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;

class MongooseSingleton {
  private static _instance: Promise<typeof mongoose>;

  static getInstance(): Promise<typeof mongoose> {
    if (!this._instance) {
      this._instance = mongoose.connect(uri, {
        // Add any other options you need
      });
    }
    return this._instance;
  }
}

const mongoosePromise = MongooseSingleton.getInstance();

export default mongoosePromise; 