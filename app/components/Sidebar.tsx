'use client'

import { Button } from "@nextui-org/react"
import { useEffect } from "react"
import { SunIcon, MoonIcon } from "./chat/Icons"
import { useTheme } from "next-themes"
import { useRouter, usePathname } from "next/navigation"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

// Tambahkan icon untuk Youtube
const YoutubeIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
  </svg>
)

// Tambahkan icon untuk AI Chat
const AIChatIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)

// Tambahkan Weather icon
const WeatherIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 2v2"/>
    <path d="M12 20v2"/>
    <path d="m4.93 4.93 1.41 1.41"/>
    <path d="m17.66 17.66 1.41 1.41"/>
    <path d="M2 12h2"/>
    <path d="M20 12h2"/>
    <path d="m6.34 17.66-1.41 1.41"/>
    <path d="m19.07 4.93-1.41 1.41"/>
    <circle cx="12" cy="12" r="4"/>
  </svg>
)

// Tambahkan icon untuk Optimize
const OptimizeIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M4.75 16.25v-8.5a2 2 0 0 1 2-2h10.5a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H6.75a2 2 0 0 1-2-2Z" />
    <path d="m4.75 15.25 4-4 4 4 2-2 4 4" />
    <circle cx="17" cy="8" r="1.25" />
  </svg>
)

// Tambahkan WibuIcon
const WibuIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
    <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"/>
    <path d="M19 11h2m-1 -1v2"/>
  </svg>
)

// Tambahkan SymbolIcon
const SymbolIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M6 8L18 8"/>
    <path d="M8 12L16 12"/>
    <path d="M10 16L14 16"/>
  </svg>
)

// Tambahkan TranslateIcon setelah SymbolIcon
const TranslateIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
  </svg>
)

// Tambahkan StickerIcon
const StickerIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M9 13h6"/>
    <path d="M9 17h6"/>
    <path d="M8 9h.01"/>
    <path d="M16 9h.01"/>
  </svg>
)

// Tambahkan GoogleFilesIcon setelah StickerIcon
const GoogleFilesIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
)

// Tambahkan GoogleBooksIcon setelah GoogleFilesIcon
const GoogleBooksIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <line x1="12" y1="6" x2="18" y2="6"/>
    <line x1="12" y1="10" x2="18" y2="10"/>
    <line x1="12" y1="14" x2="18" y2="14"/>
  </svg>
)

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
            <h2 className="text-xl font-bold mb-4">Pengaturan</h2>
            
            {/* Theme Toggle */}
            <div className="space-y-2 mb-6">
              <p className="text-sm text-foreground/80">Tema</p>
              <Button
                variant="flat"
                className="w-full justify-start gap-2"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                {theme === 'light' ? (
                  <>
                    <SunIcon />
                    <span>Mode Terang</span>
                  </>
                ) : (
                  <>
                    <MoonIcon />
                    <span>Mode Gelap</span>
                  </>
                )}
              </Button>
            </div>

            {/* Tools Section */}
            <div className="space-y-2">
              <p className="text-sm text-foreground/80">Alat</p>
              
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
                <AIChatIcon />
                <span>AI Chat</span>
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
                <YoutubeIcon />
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
                <WeatherIcon />
                <span>Cuaca</span>
              </Button>

              {/* Di dalam Tools Section, tambahkan button Optimize sebelum Weather button */}
              <Button
                variant="flat"
                className={`w-full justify-start gap-2 ${
                  pathname === '/optimize'
                    ? 'bg-primary-500/20 hover:bg-primary-500/30 text-primary'
                    : 'bg-default-100 hover:bg-default-200'
                }`}
                onClick={() => {
                  router.push('/optimize')
                  onClose()
                }}
              >
                <OptimizeIcon />
                <span>Optimasi Gambar</span>
              </Button>

              {/* Di dalam Tools Section, tambahkan button Wibu sebelum Weather button */}
              <Button
                variant="flat"
                className={`w-full justify-start gap-2 ${
                  pathname === '/wibu'
                    ? 'bg-secondary-500/20 hover:bg-secondary-500/30 text-secondary'
                    : 'bg-default-100 hover:bg-default-200'
                }`}
                onClick={() => {
                  router.push('/wibu')
                  onClose()
                }}
              >
                <WibuIcon />
                <span>Random Wibu</span>
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
                <SymbolIcon />
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
                <TranslateIcon />
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
                <StickerIcon />
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
                <GoogleFilesIcon />
                <span>Google Files</span>
              </Button>

              {/* Google Books button */}
              <Button
                variant="flat"
                className={`w-full justify-start gap-2 ${
                  pathname === '/google-books'
                    ? 'bg-warning-500/20 hover:bg-warning-500/30 text-warning'
                    : 'bg-default-100 hover:bg-default-200'
                }`}
                onClick={() => {
                  router.push('/google-books')
                  onClose()
                }}
              >
                <GoogleBooksIcon />
                <span>Google Books</span>
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