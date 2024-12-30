import { NextResponse } from 'next/server'

interface WeatherData {
  city: string
  time: string
  weatherIcon: string
  temperature: string
}

interface WeatherResponse {
  weatherData: WeatherData[]
}

// Helper function untuk konversi Fahrenheit ke Celsius
function convertToCelsius(fahrenheit: string): string {
  const f = parseFloat(fahrenheit.replace('°F', ''))
  return Math.round((f - 32) * 5 / 9).toString()
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    
    const url = city 
      ? `https://api.i-as.dev/api/weather?city=${encodeURIComponent(city)}`
      : 'https://api.i-as.dev/api/weather'
    
    const response = await fetch(url, {
      next: { revalidate: 1800 } // Cache for 30 minutes
    })

    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`)
    }

    const data: WeatherResponse = await response.json()
    
    // Konversi suhu ke Celsius
    const convertedData = {
      weatherData: data.weatherData.map(weather => ({
        ...weather,
        temperature: convertToCelsius(weather.temperature)
      }))
    }

    return NextResponse.json(convertedData)
  } catch (error) {
    console.error('Weather API Error:', error)
    return NextResponse.json(
      { 
        error: 'Terjadi kesalahan saat memproses permintaan',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 