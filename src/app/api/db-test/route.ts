import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/app/lib/mongodb';

// import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ message: 'Database connected successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Database connection failed', error: error.message }, { status: 500 });
  }
}
