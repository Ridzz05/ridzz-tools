'use client'

import NavbarComponent from "../components/Navbar"

export default function SymbolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavbarComponent />
      <main className="flex-1 container mx-auto max-w-4xl p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-secondary"
            >
              <path d="M6 8L18 8"/>
              <path d="M8 12L16 12"/>
              <path d="M10 16L14 16"/>
            </svg>
            <h1 className="text-2xl font-bold">Cari Simbol</h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
} 