'use client'

import { Button } from "@nextui-org/react"
import { useEffect, lazy, Suspense } from "react"
import { SunIcon, MoonIcon } from "./chat/Icons"
import { useTheme } from "next-themes"
import { useRouter, usePathname } from "next/navigation"
import {
  YoutubeIcon,
  AIChatIcon,
  WeatherIcon,
  SymbolIcon,
  TranslateIcon,
  StickerIcon,
  GoogleFilesIcon,
  AIDiffusionIcon,
} from './icons/LazyIcons'

// Loading fallback component
const IconLoadingFallback = () => (
  <div className="w-6 h-6 animate-pulse bg-default-200 rounded" />
)

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  // Menutup sidebar ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.getElementById('sidebar')
      if (sidebar && !sidebar.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* Overlay */}
      <div 
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      />

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`
          fixed top-0 left-0 h-full w-64 bg-background/80 backdrop-blur-xl
          border-r border-divider z-50 p-4
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">Tools</h2>
            {/* Tools Section */}
            <div className="space-y-2">
              <p className="text-sm font-bold font-mono text-foreground/80">Tools yang tersedia</p>
              
              {/* AI Chat Button */}
              <Button
                variant="flat"
                className={`w-full justify-start gap-2 ${
                  pathname === '/' 
                    ? 'bg-primary-500/20 hover:bg-primary-500/30 text-primary' 
                    : 'bg-default-100 hover:bg-default-200'
                }`}
                onClick={() => {
                  router.push('/')
                  onClose()
                }}
              >
                <Suspense fallback={<IconLoadingFallback />}>
                  <AIChatIcon />
                </Suspense>
                <span>AI Chat</span>
              </Button>

              {/* Tambahkan button AI Diffusion setelah AI Chat */}
              <Button
                variant="flat"
                className={`w-full justify-start gap-2 ${
                  pathname === '/ai-diffusion'
                    ? 'bg-warning-500/20 hover:bg-warning-500/30 text-warning'
                    : 'bg-default-100 hover:bg-default-200'
                }`}
                onClick={() => {
                  router.push('/ai-diffusion')
                  onClose()
                }}
              >
                <Suspense fallback={<IconLoadingFallback />}>
                  <AIDiffusionIcon />
                </Suspense>
                <span>Gambar AI</span>
              </Button>

              {/* Youtube Downloader Button */}
              <Button
                variant="flat"
                className={`w-full justify-start gap-2 ${
                  pathname === '/youtube-downloader'
                    ? 'bg-danger-500/20 hover:bg-danger-500/30 text-danger'
                    : 'bg-default-100 hover:bg-default-200'
                }`}
                onClick={() => {
                  router.push('/youtube-downloader')
                  onClose()
                }}
              >
                <Suspense fallback={<IconLoadingFallback />}>
                  <YoutubeIcon />
                </Suspense>
                <span>Download Video Youtube</span>
              </Button>

              {/* Tambahkan Weather button di Tools Section */}
              <Button
                variant="flat"
                className={`w-full justify-start gap-2 ${
                  pathname === '/weather'
                    ? 'bg-success-500/20 hover:bg-success-500/30 text-success'
                    : 'bg-default-100 hover:bg-default-200'
                }`}
                onClick={() => {
                  router.push('/weather')
                  onClose()
                }}
              >
                <Suspense fallback={<IconLoadingFallback />}>
                  <WeatherIcon />
                </Suspense>
                <span>Cuaca</span>
              </Button>

              {/* Di dalam Tools Section, tambahkan button Symbols sebelum Weather button */}
              <Button
                variant="flat"
                className={`w-full justify-start gap-2 ${
                  pathname === '/symbols'
                    ? 'bg-secondary-500/20 hover:bg-secondary-500/30 text-secondary'
                    : 'bg-default-100 hover:bg-default-200'
                }`}
                onClick={() => {
                  router.push('/symbols')
                  onClose()
                }}
              >
                <Suspense fallback={<IconLoadingFallback />}>
                  <SymbolIcon />
                </Suspense>
                <span>Cari Simbol</span>
              </Button>

              {/* Tambahkan button Translate di dalam Tools Section */}
              <Button
                variant="flat"
                className={`w-full justify-start gap-2 ${
                  pathname === '/translate'
                    ? 'bg-primary-500/20 hover:bg-primary-500/30 text-primary'
                    : 'bg-default-100 hover:bg-default-200'
                }`}
                onClick={() => {
                  router.push('/translate')
                  onClose()
                }}
              >
                <Suspense fallback={<IconLoadingFallback />}>
                  <TranslateIcon />
                </Suspense>
                <span>Terjemahan</span>
              </Button>

              {/* Tambahkan button Sticker di dalam Tools Section */}
              <Button
                variant="flat"
                className={`w-full justify-start gap-2 ${
                  pathname === '/sticker'
                    ? 'bg-warning-500/20 hover:bg-warning-500/30 text-warning'
                    : 'bg-default-100 hover:bg-default-200'
                }`}
                onClick={() => {
                  router.push('/sticker')
                  onClose()
                }}
              >
                <Suspense fallback={<IconLoadingFallback />}>
                  <StickerIcon />
                </Suspense>
                <span>Stiker</span>
              </Button>

              {/* Tambahkan button Google Files di dalam Tools Section */}
              <Button
                variant="flat"
                className={`w-full justify-start gap-2 ${
                  pathname === '/google-files'
                    ? 'bg-success-500/20 hover:bg-success-500/30 text-success'
                    : 'bg-default-100 hover:bg-default-200'
                }`}
                onClick={() => {
                  router.push('/google-files')
                  onClose()
                }}
              >
                <Suspense fallback={<IconLoadingFallback />}>
                  <GoogleFilesIcon />
                </Suspense>
                <span>Google Files</span>
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-foreground/60">
            <p>K.A Chat v1.0.0</p>
          </div>
        </div>
      </div>
    </>
  )
} 