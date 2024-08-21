import { NextResponse } from 'next/server';

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const backendUrl = 'http://localhost:8080'; // 백엔드 서버의 실제 URL로 변경

    const response = await fetch(`${backendUrl}/quests/${id}/participate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error('Failed to update quest participation in backend');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating quest participation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}