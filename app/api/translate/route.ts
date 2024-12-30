import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get('text')
  const lang = searchParams.get('lang')

  if (!text || !lang) {
    return NextResponse.json(
      { error: 'Text dan bahasa tujuan harus diisi' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(
      `https://api.i-as.dev/api/translate?text=${encodeURIComponent(text)}&lang=${lang}`,
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
      throw new Error('Gagal menerjemahkan teks')
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Translate API Error:', error)
    return NextResponse.json(
      { error: 'Gagal menerjemahkan teks' },
      { status: 500 }
    )
  }
} 