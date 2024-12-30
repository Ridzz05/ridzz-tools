'use client'

import { useState } from "react"
import { 
  Card, 
  CardBody,
  Input,
  Button,
  Spinner,
  Image
} from "@nextui-org/react"

interface Sticker {
  title: string
  link: string
  image: string
}

export default function StickerPage() {
  const [query, setQuery] = useState("")
  const [stickers, setStickers] = useState<Sticker[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [selectedSticker, setSelectedSticker] = useState<string[]>([])
  const [isDetailLoading, setIsDetailLoading] = useState(false)

  const handleSearch = async (resetPage = true) => {
    if (!query.trim()) return

    setIsLoading(true)
    setError("")
    
    if (resetPage) {
      setPage(1)
      setStickers([])
    }

    try {
      const response = await fetch(`/api/sticker?q=${encodeURIComponent(query)}&page=${resetPage ? 1 : page}`)
      if (!response.ok) throw new Error('Gagal mengambil data stiker')
      
      const data = await response.json()
      setStickers(prev => resetPage ? data.stickerList : [...prev, ...data.stickerList])
      if (!resetPage) setPage(prev => prev + 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStickerClick = async (link: string) => {
    setIsDetailLoading(true)
    setError("")
    
    try {
      const slug = link.split('/').pop()
      const response = await fetch(`/api/sticker/detail/${slug}`)
      if (!response.ok) throw new Error('Gagal mengambil detail stiker')
      
      const data = await response.json()
      setSelectedSticker(data.sticker)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setIsDetailLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-default-50">
        <CardBody>
          <p className="text-sm text-foreground/70">
            Cari dan lihat stiker.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              label="Cari stiker"
              placeholder="Ketik kata kunci..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(true)}
              className="flex-1"
            />
            <Button
              color="warning"
              onClick={() => handleSearch(true)}
              isLoading={isLoading}
              className="h-[56px] sm:w-[200px]"
            >
              Cari
            </Button>
          </div>

          {error && (
            <p className="text-danger text-sm">{error}</p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {stickers.map((sticker, index) => (
              <Card 
                key={index} 
                isPressable 
                onPress={() => handleStickerClick(sticker.link)}
                className="aspect-square"
              >
                <CardBody className="p-2">
                  <Image
                    alt={sticker.title}
                    src={sticker.image}
                    className="object-contain w-full h-full"
                  />
                </CardBody>
              </Card>
            ))}
          </div>

          {stickers.length > 0 && !isLoading && (
            <Button
              variant="flat"
              onClick={() => handleSearch(false)}
              className="w-full"
            >
              Muat lebih banyak
            </Button>
          )}

          {isLoading && (
            <div className="flex justify-center p-4">
              <Spinner color="warning" />
            </div>
          )}
        </CardBody>
      </Card>

      {/* Modal Detail Sticker */}
      {selectedSticker.length > 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg">
            <CardBody className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {selectedSticker.map((url, index) => (
                  <Image
                    key={index}
                    alt="Sticker"
                    src={url}
                    className="w-full"
                  />
                ))}
              </div>
              <Button
                color="danger"
                variant="light"
                onPress={() => setSelectedSticker([])}
                className="w-full"
              >
                Tutup
              </Button>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  )
} 