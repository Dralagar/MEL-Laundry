import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/MEL');
    const db = client.db('mel');
    const collection = db.collection('locations');
    
    const locations = await collection.find({}).toArray();
    
    await client.close();
    return NextResponse.json(locations);
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
    const { name, address, city, state, zipCode, status } = body;

    // Validate incoming data
    if (!name || !address || !city || !state || !zipCode) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/MEL');
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

    await client.close();

    return NextResponse.json(
      { ...body, _id: newLocation.insertedId }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create location:', error);
    return NextResponse.json({ error: 'Failed to create location' }, { status: 500 });
  }
}