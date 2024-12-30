'use client'

import { useState } from "react"
import { Input, Button, Select, SelectItem, Image } from "@nextui-org/react"

interface VideoFormat {
  label: string
  value: string
}

interface YoutubeResponse {
  Status: string
  StatusCode: number
  video: {
    Best: string
    Medium: string
  }
  Audio: string
  Thumbnail: string
}

const videoFormats: VideoFormat[] = [
  { label: "Video - Kualitas Terbaik", value: "best" },
  { label: "Video - Kualitas Sedang", value: "medium" },
  { label: "Audio MP3", value: "audio" },
]

export default function YoutubeDownloaderPage() {
  const [url, setUrl] = useState("")
  const [selectedFormat, setSelectedFormat] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [videoData, setVideoData] = useState<YoutubeResponse | null>(null)

  const handleDownload = async () => {
    if (!url) {
      setError("URL video tidak boleh kosong")
      return
    }
    if (!selectedFormat) {
      setError("Pilih format video terlebih dahulu")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: YoutubeResponse = await response.json()

      if (data.StatusCode === 200) {
        setVideoData(data)
        
        let downloadUrl = ''
        switch (selectedFormat) {
          case 'best':
            downloadUrl = data.video.Best
            break
          case 'medium':
            downloadUrl = data.video.Medium
            break
          case 'audio':
            downloadUrl = data.Audio
            break
        }

        if (downloadUrl) {
          window.open(downloadUrl, '_blank')
        } else {
          setError("URL download tidak tersedia")
        }
      } else {
        setError("Gagal mendapatkan informasi video")
      }
    } catch (err) {
      console.error('Error details:', err)
      if (err instanceof Error) {
        setError(`Terjadi kesalahan: ${err.message}`)
      } else {
        setError("Terjadi kesalahan saat mengunduh video")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-default-50 rounded-xl p-4 shadow-lg border border-divider">
        <div className="space-y-4">
          {/* URL Input */}
          <Input
            label="URL Video"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            variant="flat"
            errorMessage={error}
            isInvalid={!!error}
            classNames={{
              label: "text-foreground/90",
              input: [
                "bg-transparent",
                "text-foreground/90",
                "placeholder:text-foreground/50",
              ],
              inputWrapper: [
                "bg-default-100/50",
                "dark:bg-default-100/20",
                "backdrop-blur-xl",
                "hover:bg-default-100",
                "dark:hover:bg-default-100/40",
                "group-data-[focused=true]:bg-default-100",
                "dark:group-data-[focused=true]:bg-default-100/40",
                "!cursor-text",
                "shadow-sm"
              ]
            }}
          />

          {/* Format Selection */}
          <Select
            label="Format Video"
            placeholder="Pilih format video"
            selectedKeys={selectedFormat ? [selectedFormat] : []}
            onChange={(e) => setSelectedFormat(e.target.value)}
            variant="flat"
            classNames={{
              label: "text-foreground/90",
              trigger: [
                "bg-default-100/50",
                "dark:bg-default-100/20",
                "backdrop-blur-xl",
                "hover:bg-default-100",
                "dark:hover:bg-default-100/40",
                "group-data-[focused=true]:bg-default-100",
                "dark:group-data-[focused=true]:bg-default-100/40",
                "shadow-sm"
              ],
              listbox: [
                "bg-background/80",
                "backdrop-blur-lg",
                "shadow-lg"
              ]
            }}
          >
            {videoFormats.map((format) => (
              <SelectItem 
                key={format.value} 
                value={format.value}
                className="text-foreground/90"
              >
                {format.label}
              </SelectItem>
            ))}
          </Select>

          {/* Download Button */}
          <Button
            color="danger"
            variant="shadow"
            size="lg"
            className="w-full font-medium"
            onClick={handleDownload}
            isLoading={isLoading}
          >
            {isLoading ? "Mengunduh..." : "Download"}
          </Button>
        </div>
      </div>

      {/* Preview Section */}
      {videoData && (
        <div className="bg-default-50 rounded-xl p-4 shadow-lg border border-divider">
          <h3 className="text-lg font-semibold mb-3">Preview Video</h3>
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <Image
              src={videoData.Thumbnail}
              alt="Video Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  )
} 