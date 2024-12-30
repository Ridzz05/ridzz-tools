import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const page = searchParams.get('page') || '1'

  if (!query) {
    return NextResponse.json(
      { error: 'Parameter pencarian diperlukan' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(
      `https://api.i-as.dev/api/sticker?q=${encodeURIComponent(query)}&page=${page}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: {
          revalidate: 60 // Cache selama 1 menit
        }
      }
    )

    if (!response.ok) {
      throw new Error('Gagal mengambil data stiker')
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Sticker Search API Error:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data stiker' },
      { status: 500 }
    )
  }
}