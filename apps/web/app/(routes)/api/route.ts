import { NextResponse } from '@/infra/next/server';

export async function GET() {
  return NextResponse.json(
    {
      message: 'Welcome to Notex API!',
    },
    { status: 200 },
  );
}
