'use client'

import NavbarComponent from '../components/Navbar'

export default function GoogleBooksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavbarComponent />
      <div className="container mx-auto p-4 min-h-screen">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </div>
    </>
  )
} 