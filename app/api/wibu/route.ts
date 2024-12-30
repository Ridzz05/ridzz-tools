import { NextResponse } from 'next/server'

interface WibuRequest {
  category: string
  isNsfw?: boolean
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const isNsfw = searchParams.get('isNsfw') === 'true'

    if (!category) {
      return NextResponse.json(
        { error: 'Kategori harus diisi' },
        { status: 400 }
      )
    }

    const baseUrl = isNsfw 
      ? 'https://api.i-as.dev/api/wibu-x'
      : 'https://api.i-as.dev/api/wibu'

    const timestamp = Date.now()
    const response = await fetch(`${baseUrl}/${category}?timestamp=${timestamp}`)

    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`)
    }

    const imageBuffer = await response.arrayBuffer()
    const contentType = response.headers.get('Content-Type') || 'image/jpeg'
    
    // Deteksi format gambar dari Content-Type header
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType, // Menggunakan Content-Type dari response asli
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    console.error('Wibu API Error:', error)
    return NextResponse.json(
      { 
        error: 'Terjadi kesalahan saat mengambil gambar',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
