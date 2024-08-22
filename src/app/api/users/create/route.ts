import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { nickname, walletAddress, roleId } = await request.json()
    const backendUrl = 'http://localhost:8080'; // 백엔드 서버의 실제 URL로 변경


    const backendResponse = await fetch(`${backendUrl}/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname, walletAddress, roleId }),
    })

    if (!backendResponse.ok) {
      throw new Error('Backend server error')
    }

    const data = await backendResponse.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in create user API:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}