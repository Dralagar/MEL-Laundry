import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
});

export async function GET() {
  try {
    const query = `*[_type == "promotion" && active == true] | order(_createdAt desc)[0]`;
    const promotion = await client.fetch(query);
    
    return Response.json(promotion);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch promotion' }, { status: 500 });
  }
} 