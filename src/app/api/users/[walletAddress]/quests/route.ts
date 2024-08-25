import { NextResponse } from 'next/server'

export async function GET(request: Request, {params}:any) {
  const { walletAddress } = params

  try {
    const backendUrl = process.env.BACKEND_API_URL
    const backendResponse = await fetch(`${backendUrl}/users/${walletAddress}/quests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: "no-store"
    })

    if (!backendResponse.ok) {
      throw new Error('Backend server error')
    }

    const data = await backendResponse.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Error checking wallet' }, { status: 500 })
  }
}