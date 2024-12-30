'use client'

import { useState } from "react"
import { 
  Card, 
  CardBody,
  Button,
  Textarea,
  Select,
  SelectItem
} from "@nextui-org/react"

const languages = [
  { id: "id", name: "Indonesia" },
  { id: "en", name: "Inggris" },
  { id: "es", name: "Spanyol" },
  { id: "fr", name: "Prancis" },
  { id: "de", name: "Jerman" },
  { id: "it", name: "Italia" },
  { id: "pt", name: "Portugis" },
  { id: "nl", name: "Belanda" },
  { id: "pl", name: "Polandia" },
  { id: "ru", name: "Rusia" },
  { id: "ja", name: "Jepang" },
  { id: "ko", name: "Korea" },
  { id: "zh", name: "Mandarin" },
  { id: "ar", name: "Arab" },
  { id: "hi", name: "Hindi" },
]

export default function TranslatePage() {
  const [text, setText] = useState("")
  const [targetLang, setTargetLang] = useState("en")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleTranslate = async () => {
    if (!text.trim()) return

    setIsLoading(true)
    setError("")
    
    try {
      const response = await fetch(`/api/translate?text=${encodeURIComponent(text)}&lang=${targetLang}`)
      if (!response.ok) throw new Error('Gagal menerjemahkan teks')
      
      const data = await response.json()
      setResult(data.textResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-default-50">
        <CardBody>
          <p className="text-sm text-foreground/70">
            Masukkan teks yang ingin diterjemahkan.
          </p>
        </CardBody>
      </Card>

      <div className="grid gap-4">
        <Card>
          <CardBody className="space-y-4">
            <Textarea
              label="Teks"
              placeholder="Ketik atau tempel teks di sini..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              minRows={4}
            />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select 
                label="Terjemahkan ke"
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="sm:max-w-[200px]"
              >
                {languages.map((lang) => (
                  <SelectItem key={lang.id} value={lang.id}>
                    {lang.name}
                  </SelectItem>
                ))}
              </Select>

              <Button
                color="primary"
                onClick={handleTranslate}
                isLoading={isLoading}
                className="h-[56px] sm:w-[200px]"
              >
                Terjemahkan
              </Button>
            </div>
          </CardBody>
        </Card>

        {(result || error) && (
          <Card>
            <CardBody>
              {error ? (
                <p className="text-danger">{error}</p>
              ) : (
                <p className="whitespace-pre-wrap">{result}</p>
              )}
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  )
} 