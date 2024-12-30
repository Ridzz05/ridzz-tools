'use client'

import { useState } from 'react'
import { Input, Button, Card, CardBody, Image } from "@nextui-org/react"

// Tambahkan SearchIcon component
const SearchIcon = () => (
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
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

interface Book {
  title: string
  subtitle?: string
  author: string
  type: string
  category: string
  price: {
    amount: number
    currencyCode: string
  }
  priceRetail: {
    amount: number
    currencyCode: string
  }
  description: string
  images: {
    smallThumbnail: string
    thumbnail: string
  }
  review: string
}

interface BooksResponse {
  totalItems: number
  books: Book[]
}

export default function GoogleBooksPage() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const searchBooks = async (page: number = 1) => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`/api/google-books?q=${query}&page=${page}`)
      const data: BooksResponse = await response.json()
      setBooks(data.books)
      setTotalItems(data.totalItems)
      setCurrentPage(page)
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Google Books</h1>
        <p className="text-default-500">Cari dan temukan buku dari Google Books</p>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Cari buku..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchBooks()}
          startContent={<SearchIcon />}
          className="flex-1"
        />
        <Button
          color="primary"
          isLoading={loading}
          onClick={() => searchBooks()}
        >
          Cari
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book, index) => (
          <Card key={index} className="hover:scale-105 transition-transform">
            <CardBody className="p-4">
              <div className="flex gap-4">
                <Image
                  alt={book.title}
                  className="object-cover w-24 h-32"
                  src={book.images.thumbnail || '/placeholder-book.png'}
                />
                <div className="space-y-2 flex-1">
                  <h3 className="font-bold line-clamp-2">{book.title}</h3>
                  {book.subtitle && (
                    <p className="text-sm text-default-500 line-clamp-2">{book.subtitle}</p>
                  )}
                  <p className="text-sm">Oleh: {book.author}</p>
                  {book.price && (
                    <p className="text-sm font-semibold">
                      {book.price.amount} {book.price.currencyCode}
                    </p>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {totalItems > 0 && (
        <div className="flex justify-center gap-2">
          <Button
            isDisabled={currentPage === 1 || loading}
            onClick={() => searchBooks(currentPage - 1)}
          >
            Sebelumnya
          </Button>
          <Button
            isDisabled={books.length < 10 || loading}
            onClick={() => searchBooks(currentPage + 1)}
          >
            Selanjutnya
          </Button>
        </div>
      )}
    </div>
  )
} 