// app/api/quests/submit/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 여기서 실제 백엔드 API를 호출합니다.
    const backendApiUrl = process.env.BACKEND_API_URL

    const response = await fetch(`${backendApiUrl}/quests/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Backend API request failed');
    }

    const data = await response.json();

    // 백엔드 응답을 클라이언트에 전달
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error in quest submission:', error);
    return NextResponse.json({ error: 'Failed to submit quest' }, { status: 500 });
  }
}