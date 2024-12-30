'use client'

import NavbarComponent from "../components/Navbar"

export const dynamic = 'force-dynamic'
export const revalidate = 3600
export const fetchCache = 'force-cache'

export default function OptimizeLayout({
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
              fill="none" 
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M4.75 16.25v-8.5a2 2 0 0 1 2-2h10.5a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H6.75a2 2 0 0 1-2-2Z" />
              <path d="m4.75 15.25 4-4 4 4 2-2 4 4" />
              <circle cx="17" cy="8" r="1.25" />
            </svg>
            <h1 className="text-2xl font-bold">Optimasi Gambar</h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
} 