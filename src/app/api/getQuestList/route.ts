// app/api/createQuest/route.ts

import {NextResponse} from 'next/server';

export async function GET(request: Request) {
  try {
    // 백엔드 서버의 URL을 설정합니다.
    const backendUrl = `${process.env.BACKEND_API_URL}/quests`

    // 백엔드 서버로 요청을 보냅니다.
    const backendResponse = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: "no-store"
    });

    console.log(backendResponse)

    // 백엔드 서버의 응답을 받아옵니다.
    const responseData = await backendResponse.json();


    if (backendResponse.ok) {
      return NextResponse.json(responseData, {status: 200});
    } else {
      console.error('Failed to create quest on backend:', responseData);
      return NextResponse.json({message: 'Failed to create quest on backend'}, {status: backendResponse.status});
    }
  } catch (error) {
    console.error('Failed to create quest:', error);
    return NextResponse.json({message: 'Failed to create quest'}, {status: 500});
  }
}
