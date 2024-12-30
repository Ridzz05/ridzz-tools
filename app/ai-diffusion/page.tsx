'use client'

import { useState, useRef } from 'react'
import { 
  Input, 
  Button, 
  Card, 
  CardBody, 
  CardFooter,
  Image,
  Tooltip,
  Divider,
  Textarea
} from "@nextui-org/react"
import { DiffusionImage } from '../types/ai-diffusion'
import { 
  ImageIcon, 
  SendIcon, 
  UploadIcon,
  InfoIcon 
} from '../components/icons/AIDiffusionIcons'

export default function AIDiffusionPage() {
  const [keyword, setKeyword] = useState('')
  const [images, setImages] = useState<DiffusionImage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setKeyword(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateImages = async () => {
    if (!keyword) {
      setError('Masukkan teks atau unggah gambar')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/ai-diffusion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate images')
      }

      setImages(data.images)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Input Section */}
      <Card className="mb-8 shadow-lg">
        <CardBody className="gap-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="text-2xl text-default-400" />
            <h2 className="text-lg font-semibold">Generate Gambar</h2>
            <Tooltip content="Masukkan deskripsi gambar atau unggah gambar referensi">
              <InfoIcon className="text-default-400 cursor-help" />
            </Tooltip>
          </div>
          
          <Divider />
          
          <Textarea
            placeholder="Deskripsikan gambar yang ingin Anda buat... (contoh: 'Pemandangan gunung dengan matahari terbenam')"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            minRows={3}
            size="lg"
            classNames={{
              input: "text-base",
              inputWrapper: "border-2 hover:border-primary focus-within:border-primary"
            }}
          />
          
          <div className="flex gap-2 justify-end">
            <Button
              color="default"
              variant="flat"
              startContent={<UploadIcon />}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Gambar Referensi
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <Button
              color="primary"
              variant="shadow"
              startContent={<SendIcon />}
              onClick={generateImages}
              isLoading={loading}
            >
              Generate
            </Button>
          </div>

          {error && (
            <p className="text-danger text-sm bg-danger-50 p-2 rounded-lg">
              ⚠️ {error}
            </p>
          )}
        </CardBody>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card className="mb-8">
          <CardBody className="flex items-center justify-center py-8">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="text-default-600">Sedang membuat gambar...</p>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Results Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card 
              key={image.id} 
              isPressable
              className="hover:scale-105 transition-transform duration-300"
            >
              <CardBody className="p-0 aspect-square">
                <Image
                  alt={image.prompt}
                  className="object-cover w-full h-full"
                  src={image.srcMedium}
                  classNames={{
                    img: "w-full h-full object-cover"
                  }}
                />
              </CardBody>
              <CardFooter className="flex-col items-start gap-2 bg-black/40 backdrop-blur-md absolute bottom-0 w-full border-t-1 border-zinc-100/50">
                <p className="text-white text-sm line-clamp-2">
                  {image.prompt}
                </p>
                <div className="flex gap-2 w-full justify-end">
                  <Button 
                    size="sm" 
                    color="primary"
                    variant="flat"
                    as="a"
                    href={image.srcMedium}
                    target="_blank"
                  >
                    Lihat Full
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && images.length === 0 && (
        <Card className="bg-default-50">
          <CardBody className="py-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <ImageIcon className="text-4xl text-default-400" />
              <div>
                <p className="text-default-600">Belum ada gambar yang dibuat</p>
                <p className="text-sm text-default-400">
                  Masukkan deskripsi atau unggah gambar referensi untuk memulai
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
} 