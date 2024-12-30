import { NextResponse } from 'next/server'

interface OptimizeRequest {
  images: string
  quality: number
}

interface OptimizeResponse {
  original: string
  optimized: string
  original_size: string
  optimized_size: string
}

export async function POST(request: Request) {
  try {
    const body: OptimizeRequest = await request.json()
    
    if (!body.images || !body.quality) {
      return NextResponse.json(
        { error: 'URL gambar dan kualitas harus diisi' },
        { status: 400 }
      )
    }

    // Validasi quality
    const quality = Number(body.quality)
    if (isNaN(quality) || quality < 1 || quality > 100) {
      return NextResponse.json(
        { error: 'Kualitas harus berupa angka antara 1-100' },
        { status: 400 }
      )
    }

    const response = await fetch('https://api.i-as.dev/api/optimized/img', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        images: body.images,
        quality: quality
      })
    })

    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`)
    }

    const data: OptimizeResponse = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Image Optimization Error:', error)
    return NextResponse.json(
      { 
        error: 'Terjadi kesalahan saat mengoptimasi gambar',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 