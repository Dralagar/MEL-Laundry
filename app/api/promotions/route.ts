// import { client } from '@/lib/sanity'; // Comment out this line
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // const promotions = await client.fetch(` // Comment out this line
    //   *[_type == "promotion"] | order(startDate desc) {
    //     title,
    //     description,
    //     startDate,
    //     endDate,
    //     "imageUrl": image.asset->url
    //   }
    // `); // Comment out this line
    
    // return NextResponse.json(promotions); // Comment out this line
    return NextResponse.json({ message: 'Promotions fetching is temporarily disabled' }); // Add this line
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promotions' }, { status: 500 });
  }
} 