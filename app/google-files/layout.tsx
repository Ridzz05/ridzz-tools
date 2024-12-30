'use client'

import NavbarComponent from "../components/Navbar"

export default function GoogleFilesLayout({
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
              className="text-success"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
            <h1 className="text-2xl font-bold">Google Files</h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
} 