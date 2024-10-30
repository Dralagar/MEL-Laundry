import { NextResponse } from 'next/server';

// Mock data for testing - replace with your actual MongoDB connection later
const mockLocations = [
  {
    _id: '1',
    name: 'Downtown Location',
    address: '123 Main St',
    city: 'Anytown',
    state: 'ST',
    zipCode: '12345',
    status: 'Open',
  },
  {
    _id: '2',
    name: 'Westside Location',
    address: '456 West Ave',
    city: 'Anytown',
    state: 'ST',
    zipCode: '12346',
    status: 'Not yet launched',
  },
];

export async function GET() {
  try {
    // Return mock data for now
    return NextResponse.json(mockLocations);
  } catch (error) {
    console.error('Failed to fetch locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, address, city, state, zipCode, isOpen } = body;

    // Validate incoming data
    if (!name || !address || !city || !state || !zipCode) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { MongoClient } = require('mongodb');
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('mel');
    const collection = db.collection('locations');
    const newLocation = await collection.insertOne({
      name,
      address,
      city,
      state,
      zipCode,
      isOpen: isOpen ?? false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json(
      { ...body, _id: newLocation.insertedId }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create location:', error);
    return NextResponse.json({ error: 'Failed to create location' }, { status: 500 });
  }
}