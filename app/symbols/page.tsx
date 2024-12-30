'use client'

import { useState, useEffect } from "react"
import { 
  Card, 
  CardBody,
  Button,
  Spinner,
  Tooltip,
  Divider
} from "@nextui-org/react"
import { SymbolIcon, CopyIcon, CheckIcon } from '../components/icons/SymbolIcons'

export default function SymbolsPage() {
  const [symbols, setSymbols] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    fetchSymbols()
  }, [])

  const fetchSymbols = async () => {
    try {
      const response = await fetch('/api/symbols')
      if (!response.ok) throw new Error('Gagal mengambil data simbol')
      
      const data = await response.json()
      setSymbols(data.symbols)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = (symbol: string) => {
    navigator.clipboard.writeText(symbol)
    setCopied(symbol)
    setTimeout(() => setCopied(null), 1000)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-secondary-100 to-secondary-50">
        <CardBody className="p-6">
          <div className="flex items-center gap-3">
            <SymbolIcon className="text-2xl text-secondary-600" />
            <div>
              <h1 className="text-xl font-bold text-secondary-900">Simbol Spesial</h1>
              <p className="text-sm text-secondary-700">
                Koleksi simbol untuk kebutuhan teks Anda
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Info Card */}
      <Card className="bg-default-50 shadow-sm">
        <CardBody className="p-4">
          <div className="flex items-center gap-2 text-default-600">
            <CopyIcon className="text-lg" />
            <p className="text-sm">
              Klik simbol untuk menyalin ke clipboard
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Symbols Grid Card */}
      <Card className="shadow-lg">
        <CardBody className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Spinner 
                color="secondary"
                size="lg"
                classNames={{
                  circle1: "border-b-secondary-500",
                  circle2: "border-b-secondary-500"
                }}
              />
              <p className="text-default-600">Memuat simbol...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-danger-50 text-danger-600 rounded-lg flex items-center gap-2">
              <span>⚠️</span>
              <p className="text-sm">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {symbols.map((symbol, index) => (
                <Tooltip 
                  key={index}
                  content="Klik untuk menyalin"
                  delay={500}
                  closeDelay={0}
                >
                  <Button
                    variant="flat"
                    className={`h-16 text-2xl relative overflow-hidden group transition-all duration-300
                      ${copied === symbol ? 'bg-secondary-100' : 'hover:bg-default-100'}`}
                    onClick={() => handleCopy(symbol)}
                  >
                    <span className={copied === symbol ? 'opacity-50' : ''}>
                      {symbol}
                    </span>
                    {copied === symbol && (
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-secondary/90 text-white text-sm font-medium animate-fade-up animate-duration-300">
                        <CheckIcon className="text-lg" />
                        <span>Tersalin!</span>
                      </div>
                    )}
                  </Button>
                </Tooltip>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
} 