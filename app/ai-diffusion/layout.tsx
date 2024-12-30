'use client'

import NavbarComponent from "../components/Navbar"

export default function AIDiffusionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <NavbarComponent />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">AI Diffusion</h1>
        {children}
      </div>
    </div>
  )
} 