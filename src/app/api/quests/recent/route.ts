import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get('walletAddress');
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';

  if (!walletAddress) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }

  try {
    const backendUrl = process.env.BACKEND_API_URL

    const response = await fetch(`${backendUrl}/quests/recent?walletAddress=${walletAddress}&page=${page}&limit=${limit}`);

    if (!response.ok) {
      throw new Error('Failed to fetch recent quests');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching recent quests:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}