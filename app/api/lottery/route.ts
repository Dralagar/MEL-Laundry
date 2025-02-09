import { client } from '@/lib/sanity';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const lotteryData = await client.fetch(`
      *[_type == "lottery"] | order(drawingDate desc)[0] {
        drawingDate,
        winners,
        "videoUrl": announcementVideo.asset->url
      }
    `);
    
    return NextResponse.json(lotteryData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch lottery data' }, { status: 500 });
  }
} 