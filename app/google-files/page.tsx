'use client'

import { useState } from "react"
import { 
  Card, 
  CardBody,
  Input,
  Button,
  Spinner,
  Select,
  SelectItem,
} from "@nextui-org/react"

interface GoogleFile {
  title: string
  url: string
}

// Fungsi untuk mendapatkan icon SVG berdasarkan tipe file
const FileIcon = ({ extension }: { extension: string }) => {
  // Ukuran tetap untuk semua icon: 24x24 pixels
  const baseStyle = {
    minWidth: '24px',
    width: '24px',
    height: '24px'
  }

  switch(extension.toLowerCase()) {
    case 'pdf':
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          style={baseStyle}
          className="text-danger shrink-0" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <path d="M9 13h6"/>
          <path d="M9 17h6"/>
          <path d="M9 9h1"/>
        </svg>
      )
    case 'doc':
    case 'docx':
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          style={baseStyle}
          className="text-primary shrink-0" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <line x1="10" y1="9" x2="8" y2="9"/>
        </svg>
      )
    case 'xls':
    case 'xlsx':
    case 'csv':
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          style={baseStyle}
          className="text-success shrink-0" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="8" y1="13" x2="16" y2="13"/>
          <line x1="8" y1="17" x2="16" y2="17"/>
          <line x1="8" y1="9" x2="10" y2="9"/>
        </svg>
      )
    case 'ppt':
    case 'pptx':
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          style={baseStyle}
          className="text-warning shrink-0" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <circle cx="10" cy="13" r="2"/>
          <path d="M10 15v3"/>
        </svg>
      )
    case 'zip':
    case 'gz':
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          style={baseStyle}
          className="text-secondary shrink-0" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="12" y1="18" x2="12" y2="12"/>
          <line x1="9" y1="15" x2="15" y2="15"/>
        </svg>
      )
    default:
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          style={baseStyle}
          className="text-default-600 shrink-0" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      )
  }
}

const fileTypes = [
  { value: "pdf", label: "PDF" },
  { value: "doc", label: "DOC" },
  { value: "docx", label: "DOCX" },
  { value: "xls", label: "XLS" },
  { value: "xlsx", label: "XLSX" },
  { value: "ppt", label: "PPT" },
  { value: "pptx", label: "PPTX" },
  { value: "txt", label: "TXT" },
  { value: "html", label: "HTML" },
  { value: "htm", label: "HTM" },
  { value: "csv", label: "CSV" },
  { value: "rtf", label: "RTF" },
  { value: "odt", label: "ODT" },
  { value: "ods", label: "ODS" },
  { value: "odp", label: "ODP" },
  { value: "epub", label: "EPUB" },
  { value: "zip", label: "ZIP" },
  { value: "gz", label: "GZ" },
]

export default function GoogleFilesPage() {
  const [query, setQuery] = useState("")
  const [type, setType] = useState("")
  const [files, setFiles] = useState<GoogleFile[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)

  const handleSearch = async (resetPage = true) => {
    if (!query.trim()) return

    setIsLoading(true)
    setError("")
    
    if (resetPage) {
      setPage(1)
      setFiles([])
    }

    try {
      const response = await fetch(
        `/api/google/file?q=${encodeURIComponent(query)}&type=${type}&page=${resetPage ? 1 : page}&limit=10`
      )
      
      if (!response.ok) throw new Error('Gagal mengambil data file')
      
      const data = await response.json()
      setFiles(prev => resetPage ? data.file : [...prev, ...data.file])
      if (!resetPage) setPage(prev => prev + 1)
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
            Cari berbagai jenis file dari Google.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              label="Cari file"
              placeholder="Ketik kata kunci..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(true)}
              className="flex-1"
            />
            <Select
              label="Tipe file"
              placeholder="Pilih tipe"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="sm:w-[200px]"
            >
              {fileTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </Select>
            <Button
              color="success"
              onClick={() => handleSearch(true)}
              isLoading={isLoading}
              className="h-[56px] sm:w-[120px]"
            >
              Cari
            </Button>
          </div>

          {error && (
            <p className="text-danger text-sm">{error}</p>
          )}

          <div className="space-y-2">
            {files.map((file, index) => (
              <Card key={index} isPressable>
                <CardBody>
                  <div className="flex items-center gap-4">
                    <FileIcon extension={file.url.split('.').pop() || ''} />
                    <a 
                      href={file.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary line-clamp-2 flex-grow"
                    >
                      {file.title}
                    </a>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {files.length > 0 && !isLoading && (
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
              <Spinner color="success" />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
} 