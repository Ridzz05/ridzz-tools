'use client'

import { useState } from "react"
import { Input, Button, Card, CardBody, Slider } from "@nextui-org/react"

interface OptimizeResult {
  original: string
  optimized: string
  original_size: string
  optimized_size: string
}

export default function OptimizePage() {
  const [imageUrl, setImageUrl] = useState("")
  const [quality, setQuality] = useState(80)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<OptimizeResult | null>(null)

  const handleOptimize = async () => {
    if (!imageUrl) {
      setError("URL gambar harus diisi")
      return
    }

    try {
      setIsLoading(true)
      setError("")
      setResult(null)

      const response = await fetch('/api/optimize/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images: imageUrl,
          quality: quality
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Gagal mengoptimasi gambar')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      console.error('Error optimizing image:', err)
      setError(err instanceof Error ? err.message : "Gagal mengoptimasi gambar")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-default-50">
        <CardBody className="gap-4">
          <div>
            <p className="text-sm text-foreground/70">
              Optimalkan ukuran gambar tanpa mengurangi kualitas secara signifikan.
              Masukkan URL gambar dan atur tingkat kualitas yang diinginkan.
            </p>
          </div>

          <Input
            label="URL Gambar"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            variant="flat"
            errorMessage={error}
            isInvalid={!!error}
          />

          <div className="space-y-2">
            <p className="text-sm">Kualitas Gambar: {quality}%</p>
            <Slider 
              size="sm"
              step={1}
              maxValue={100}
              minValue={1}
              value={quality}
              onChange={(value) => setQuality(Number(value))}
              className="max-w-md"
            />
          </div>

          <Button
            color="primary"
            onClick={handleOptimize}
            isLoading={isLoading}
            className="w-full sm:w-auto"
          >
            Optimasi Gambar
          </Button>
        </CardBody>
      </Card>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardBody>
              <h3 className="text-lg font-semibold mb-2">Gambar Asli</h3>
              <img 
                src={result.original} 
                alt="Original" 
                className="w-full h-auto rounded-lg"
              />
              <p className="mt-2 text-sm text-foreground/70">
                Ukuran: {result.original_size}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="text-lg font-semibold mb-2">Gambar Teroptimasi</h3>
              <img 
                src={result.optimized} 
                alt="Optimized" 
                className="w-full h-auto rounded-lg"
              />
              <p className="mt-2 text-sm text-foreground/70">
                Ukuran: {result.optimized_size}
              </p>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  )
} 