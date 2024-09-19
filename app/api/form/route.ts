import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  // Process the form data here (e.g., send an email, save to database)
  console.log('Received form data:', body)
  
  return NextResponse.json({ message: 'Form submitted successfully' })}
