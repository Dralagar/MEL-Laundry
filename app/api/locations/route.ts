import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        isOpen: true,
      },
    });

    const locationsWithStatus = locations.map(location => ({
      ...location,
      status: location.isOpen ? 'Open' : 'Not yet launched',
    }));

    return NextResponse.json(locationsWithStatus);
  } catch (error) {
    console.error('Failed to fetch locations:', error);
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, address, city, state, zipCode, isOpen } = body;

    const newLocation = await prisma.location.create({
      data: {
        name,
        address,
        city,
        state,
        zipCode,
        isOpen: isOpen || false,
      },
    });

    return NextResponse.json(newLocation, { status: 201 });
  } catch (error) {
    console.error('Failed to create location:', error);
    return NextResponse.json({ error: 'Failed to create location' }, { status: 500 });
  }
}
