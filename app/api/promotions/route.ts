import { client } from '@/lib/sanity';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const promotions = await client.fetch(`
      *[_type == "promotion"] | order(startDate desc) {
        title,
        description,
        startDate,
        endDate,
        "imageUrl": image.asset->url
      }
    `);
    
    return NextResponse.json(promotions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promotions' }, { status: 500 });
  }
} 