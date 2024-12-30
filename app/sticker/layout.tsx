'use client'

import NavbarComponent from "../components/Navbar"

export default function StickerLayout({
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
              className="text-warning"
            >
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M9 13h6"/>
              <path d="M9 17h6"/>
              <path d="M8 9h.01"/>
              <path d="M16 9h.01"/>
            </svg>
            <h1 className="text-2xl font-bold">Stiker</h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
} 