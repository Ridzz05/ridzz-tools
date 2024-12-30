'use client'

import { useState } from "react"
import { 
  Card, 
  CardBody,
  Input,
  Button,
  Spinner,
  Image,
  Tooltip,
  Divider
} from "@nextui-org/react"
import { SearchIcon, ImageIcon, CloseIcon } from '../components/icons/StickerIcons'

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
    setError("")
    
    try {
      const slug = link.split('/').pop()
      const response = await fetch(`/api/sticker/detail/${slug}`)
      if (!response.ok) throw new Error('Gagal mengambil detail stiker')
      
      const data = await response.json()
      setSelectedSticker(data.sticker)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-warning-100 to-warning-50">
        <CardBody className="p-6">
          <div className="flex items-center gap-3">
            <ImageIcon className="text-2xl text-warning-600" />
            <div>
              <h1 className="text-xl font-bold text-warning-900">Sticker Finder</h1>
              <p className="text-sm text-warning-700">
                Cari dan temukan stiker untuk koleksi Anda
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Search Card */}
      <Card className="shadow-lg">
        <CardBody className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Ketik kata kunci..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(true)}
              className="flex-1"
              startContent={<SearchIcon className="text-default-400" />}
              classNames={{
                input: "text-base",
                inputWrapper: "h-12"
              }}
            />
            <Button
              color="warning"
              onClick={() => handleSearch(true)}
              isLoading={isLoading}
              className="h-12 sm:w-[200px] bg-gradient-to-r from-warning-500 to-warning-600"
              size="lg"
            >
              {isLoading ? "Mencari..." : "Cari Stiker"}
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-danger-50 text-danger-600 rounded-lg flex items-center gap-2">
              <span>⚠️</span>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Sticker Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {stickers.map((sticker, index) => (
              <Card 
                key={index} 
                isPressable 
                onPress={() => handleStickerClick(sticker.link)}
                className="aspect-square group hover:scale-105 transition-transform duration-300"
              >
                <CardBody className="p-2 overflow-hidden">
                  <Image
                    alt={sticker.title}
                    src={sticker.image}
                    classNames={{
                      img: "object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                    }}
                  />
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          {stickers.length > 0 && !isLoading && (
            <Button
              variant="flat"
              onClick={() => handleSearch(false)}
              className="w-full h-12 bg-default-100 hover:bg-default-200"
            >
              Muat lebih banyak
            </Button>
          )}

          {/* Loading Spinner */}
          {isLoading && (
            <div className="flex justify-center p-8">
              <Spinner 
                color="warning"
                size="lg"
                classNames={{
                  circle1: "border-b-warning-500",
                  circle2: "border-b-warning-500"
                }}
              />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && stickers.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="mx-auto text-4xl text-default-400 mb-4" />
              <p className="text-default-600">Belum ada stiker yang dicari</p>
              <p className="text-sm text-default-400">
                Mulai mencari stiker dengan kata kunci di atas
              </p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Modal Detail Sticker */}
      {selectedSticker.length > 0 && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg">
            <CardBody className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Detail Stiker</h3>
                <Button
                  isIconOnly
                  variant="light"
                  onPress={() => setSelectedSticker([])}
                  className="text-default-400 hover:text-default-600"
                >
                  <CloseIcon />
                </Button>
              </div>
              <Divider />
              <div className="grid grid-cols-2 gap-4">
                {selectedSticker.map((url, index) => (
                  <Card key={index} className="bg-default-50">
                    <CardBody className="p-2">
                      <Image
                        alt="Sticker"
                        src={url}
                        className="w-full hover:scale-105 transition-transform duration-300"
                      />
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  )
} 