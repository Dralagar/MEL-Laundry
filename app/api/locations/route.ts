import dotenv from 'dotenv';
import path from 'path';
import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

let client: MongoClient | null = null;

// Singleton pattern for MongoDB client
async function getMongoClient() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/MEL');
    await client.connect();
  }
  return client;
}

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const client = await getMongoClient();
    const db = client.db('mel');
    const collection = db.collection('locations');

    if (id) {
      const location = await collection.findOne({ _id: new ObjectId(id) });
      if (!location) {
        return NextResponse.json({ error: 'Location not found' }, { status: 404 });
      }
      return NextResponse.json(location);
    } else {
      const locations = await collection.find({}).toArray();
      return NextResponse.json(locations);
    }
  } catch (error) {
    console.error('Failed to fetch locations:', error);
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, address, city, state, zipCode, status } = body;

    if (!name || !address || !city || !state || !zipCode) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db('mel');
    const collection = db.collection('locations');
    const newLocation = await collection.insertOne({
      name,
      address,
      city,
      state,
      zipCode,
      status: status ?? 'Not yet launched',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({ ...body, _id: newLocation.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Failed to create location:', error);
    return NextResponse.json({ error: 'Failed to create location' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const body = await request.json();
    const { name, address, city, state, zipCode, status } = body;

    if (!name || !address || !city || !state || !zipCode) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db('mel');
    const collection = db.collection('locations');
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          address,
          city,
          state,
          zipCode,
          status,
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    );

    if (!result?.value) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }

    return NextResponse.json(result.value);
  } catch (error) {
    console.error('Failed to update location:', error);
    return NextResponse.json({ error: 'Failed to update location' }, { status: 500 });
  }
}