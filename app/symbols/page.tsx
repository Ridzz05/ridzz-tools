'use client'

import { useState, useEffect } from "react"
import { 
  Card, 
  CardBody,
  Button,
  Spinner,
} from "@nextui-org/react"

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
    <div className="space-y-6">
      <Card className="bg-default-50">
        <CardBody>
          <p className="text-sm text-foreground/70">
            Klik simbol untuk menyalin ke clipboard.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          {isLoading ? (
            <div className="flex justify-center p-4">
              <Spinner color="secondary" />
            </div>
          ) : error ? (
            <p className="text-danger text-sm">{error}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {symbols.map((symbol, index) => (
                <Button
                  key={index}
                  variant="flat"
                  className="h-16 text-2xl relative overflow-hidden group"
                  onClick={() => handleCopy(symbol)}
                >
                  {symbol}
                  {copied === symbol && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-secondary/90 
                        text-white text-sm font-medium
                        animate-fade-up animate-duration-300"
                    >
                      Tersalin!
                    </div>
                  )}
                </Button>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
} 