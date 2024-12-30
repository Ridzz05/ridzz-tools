import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const type = searchParams.get('type')
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'

  if (!query) {
    return NextResponse.json(
      { error: 'Parameter pencarian diperlukan' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(
      `https://api.i-as.dev/api/google/file?q=${encodeURIComponent(query)}&type=${type}&page=${page}&limit=${limit}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: {
          revalidate: 60
        }
      }
    )

    if (!response.ok) {
      throw new Error('Gagal mengambil data file')
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Google Files API Error:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data file' },
      { status: 500 }
    )
  }
} 