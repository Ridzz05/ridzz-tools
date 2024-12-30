'use client'

import { useState, useEffect } from "react"
import { 
  Card, 
  CardBody, 
  Button, 
  Select, 
  SelectItem,
  Switch,
  Image,
  Spinner
} from "@nextui-org/react"

const categories = [
  "waifu", "neko", "shinobu", "megumin", "bully", 
  "cuddle", "cry", "hug", "awoo", "kiss", "lick", 
  "pat", "smug", "bonk", "yeet", "blush", "smile", 
  "wave", "highfive", "handhold", "nom", "bite", 
  "glomp", "slap", "kill", "kick", "happy", "wink", 
  "poke", "dance", "cringe"
]

const nsfwCategories = [
  "waifu", "neko", "trap", "blowjob"
]

const COOLDOWN_TIME = 5000 // 5 detik cooldown

export default function WibuPage() {
  const [selectedCategory, setSelectedCategory] = useState("waifu")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isNsfw, setIsNsfw] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [lastRequestTime, setLastRequestTime] = useState(0)
  const [countdown, setCountdown] = useState(0)

  const baseUrl = isNsfw 
    ? 'https://api.i-as.dev/api/wibu-x'
    : 'https://api.i-as.dev/api/wibu'

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [countdown])

  const handleGenerate = () => {
    const now = Date.now()
    const timeLeft = Math.ceil((COOLDOWN_TIME - (now - lastRequestTime)) / 1000)
    
    if (timeLeft > 0) {
      setCountdown(timeLeft)
      setError(`Mohon tunggu ${timeLeft} detik lagi`)
      return
    }

    setIsLoading(true)
    setError("")
    setLastRequestTime(now)
    setShowImage(true)
    setCountdown(5) // Set countdown untuk request berikutnya

    // Minimal loading time
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const handleNsfwToggle = (value: boolean) => {
    setIsNsfw(value)
    setSelectedCategory("waifu")
    setShowImage(false)
    setError("")
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setShowImage(false)
    setError("")
  }

  return (
    <div className="space-y-6">
      <Card className="bg-default-50">
        <CardBody className="gap-4">
          <div>
            <p className="text-sm text-foreground/70">
              Dapatkan gambar anime random dari berbagai kategori.
              Pilih kategori dan klik tombol untuk mendapatkan gambar baru.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              label="Pilih Kategori"
              selectedKeys={[selectedCategory]}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="max-w-xs"
            >
              {(isNsfw ? nsfwCategories : categories).map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </Select>

            <div className="flex items-center gap-4">
              <Switch
                size="sm"
                color="secondary"
                isSelected={isNsfw}
                onValueChange={handleNsfwToggle}
              >
                <span className="text-sm">NSFW (18+)</span>
              </Switch>

              <div className="flex gap-2">
                <Button
                  color="secondary"
                  onClick={handleGenerate}
                  isLoading={isLoading}
                  isDisabled={countdown > 0}
                >
                  {countdown > 0 ? `Tunggu ${countdown}s` : 'Generate'}
                </Button>
                
                {showImage && (
                  <Button
                    variant="flat"
                    onClick={() => window.open(`${baseUrl}/${selectedCategory}?dl=true`, '_blank')}
                    isDisabled={isLoading || countdown > 0}
                  >
                    Download
                  </Button>
                )}
              </div>
            </div>
          </div>

          {error && (
            <p className="text-danger text-sm">{error}</p>
          )}
        </CardBody>
      </Card>

      {showImage && (
        <Card>
          <CardBody>
            <div className="relative min-h-[200px]">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
                  <Spinner color="secondary" />
                </div>
              )}
              <Image
                src={`${baseUrl}/${selectedCategory}?t=${Date.now()}`}
                alt={`Random ${selectedCategory}`}
                classNames={{
                  wrapper: "w-full",
                  img: "w-full h-auto object-contain rounded-lg"
                }}
                onError={() => {
                  setError('Mohon tunggu beberapa saat sebelum mencoba lagi')
                  setShowImage(false)
                }}
                radius="lg"
                loading="eager"
              />
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
} 