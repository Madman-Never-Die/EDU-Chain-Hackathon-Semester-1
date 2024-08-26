import { NextResponse } from 'next/server';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const backendUrl = process.env.BACKEND_API_URL; // 백엔드 서버의 실제 URL로 변경

    const response = await fetch(`${backendUrl}/quests/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: "no-store"
    });


    if (!response.ok) {
      throw new Error('Failed to delete quest in backend');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error deleting quest:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}