'use client'

import { useState, useEffect, useMemo } from "react"
import { Input, Card, CardBody, Spinner } from "@nextui-org/react"
import dynamic from 'next/dynamic'

// Lazy load komponen Card
const WeatherCard = dynamic(() => import('./WeatherCard'), {
  loading: () => <Spinner size="lg" />,
  ssr: false
})

interface WeatherData {
  city: string
  time: string
  weatherIcon: string
  temperature: string
}

const WeatherPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  // Memoize fetch function
  const fetchWeather = useMemo(() => async (city?: string) => {
    try {
      setIsLoading(true)
      setError("")
      
      const url = city 
        ? `/api/weather?city=${encodeURIComponent(city)}`
        : '/api/weather'
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 detik timeout
      
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'max-age=1800' // Cache selama 30 menit
        }
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (Array.isArray(data.weatherData)) {
        setWeatherData(data.weatherData)
      } else {
        throw new Error('Format data tidak valid')
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Permintaan timeout, coba lagi')
        } else {
          setError(err.message)
        }
      } else {
        setError("Gagal memuat data cuaca")
      }
      setWeatherData([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounce search dengan cleanup
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        fetchWeather(searchQuery)
      } else {
        fetchWeather()
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery, fetchWeather])

  // Initial fetch dengan cleanup
  useEffect(() => {
    let mounted = true

    const initialFetch = async () => {
      if (mounted) {
        await fetchWeather()
      }
    }

    initialFetch()
    const interval = setInterval(() => mounted && fetchWeather(), 1800000)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [fetchWeather])

  return (
    <div className="space-y-4">
      <div className="bg-default-50 rounded-xl p-4 shadow-lg border border-divider">
        <div className="mb-4">
          <p className="text-sm text-foreground/70">Data cuaca dari:</p>
          <p className="font-semibold">Weather API</p>
        </div>
        
        <Input
          label="Cari Kota"
          placeholder="Contoh: Jakarta, Tokyo, New York..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="flat"
          classNames={{
            label: "text-foreground/90",
            input: [
              "bg-transparent",
              "text-foreground/90",
              "placeholder:text-foreground/50",
            ],
            inputWrapper: [
              "bg-default-100/50",
              "backdrop-blur-xl",
              "hover:bg-default-100",
              "group-data-[focused=true]:bg-default-100",
              "!cursor-text",
            ]
          }}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="text-center text-danger p-8">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      ) : weatherData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {weatherData.map((weather, index) => (
            <WeatherCard 
              key={`${weather.city}-${index}`}
              weather={weather}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-foreground/60 p-8">
          <p>Tidak ada data cuaca yang tersedia</p>
          <p className="text-sm mt-2">Coba cari kota lain</p>
        </div>
      )}
    </div>
  )
}

export default WeatherPage