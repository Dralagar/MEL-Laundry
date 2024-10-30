import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

class Singleton {
  private static _instance: Promise<MongoClient>;

  static getInstance(): Promise<MongoClient> {
    if (!this._instance) {
      const client = new MongoClient(uri, options);
      this._instance = client.connect();
    }
    return this._instance;
  }
}

const clientPromise = Singleton.getInstance();

export default clientPromise; 