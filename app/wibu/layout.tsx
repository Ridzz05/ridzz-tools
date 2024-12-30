'use client'

import NavbarComponent from "../components/Navbar"

export default function WibuLayout({
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
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
              <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"/>
              <path d="M19 11h2m-1 -1v2"/>
            </svg>
            <h1 className="text-2xl font-bold">Random Wibu</h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
} 