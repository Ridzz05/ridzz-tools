'use client'

import { useState, useEffect } from "react"
import { Input, Card, CardBody, Spinner } from "@nextui-org/react"

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

  const fetchWeather = async (city?: string) => {
    try {
      setIsLoading(true)
      setError("")
      
      const url = city 
        ? `/api/weather?city=${encodeURIComponent(city)}`
        : '/api/weather'
      
      const response = await fetch(url)
      
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
      console.error('Error fetching weather:', err)
      setError(err instanceof Error ? err.message : "Gagal memuat data cuaca")
      setWeatherData([])
    } finally {
      setIsLoading(false)
    }
  }

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        fetchWeather(searchQuery)
      } else {
        fetchWeather()
      }
    }, 500) // Delay 500ms

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Initial fetch
  useEffect(() => {
    fetchWeather()
    // Refresh data setiap 30 menit
    const interval = setInterval(() => fetchWeather(), 1800000)
    return () => clearInterval(interval)
  }, [])

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
            <Card 
              key={`${weather.city}-${index}`}
              className="bg-default-50/50 backdrop-blur-xl border border-divider"
            >
              <CardBody>
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-semibold">{weather.city}</h3>
                  <p className="text-foreground/80 text-sm">{weather.time}</p>
                  
                  <div className="flex items-baseline gap-1">
                    <p className="text-3xl font-bold">{weather.temperature}</p>
                    <span className="text-xl">°C</span>
                  </div>
                  
                  <p className="text-foreground/90">{weather.weatherIcon}</p>
                </div>
              </CardBody>
            </Card>
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