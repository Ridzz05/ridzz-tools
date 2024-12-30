import { NextResponse } from 'next/server'

// Data statis sebagai fallback
const fallbackSymbols = {
  symbols: [
    "©", "®", "™", "℠", "℗", "§", "¶", "†", "‡", "•", "·", "⋄", "◊", "○", "●", "◯", 
    "☆", "★", "♠", "♣", "♥", "♦", "♤", "♧", "♡", "♢", "✓", "✔", "✗", "✘", "←", "→",
    "↑", "↓", "↔", "↕", "⇄", "⇅", "⌘", "⌥", "⌃", "⌅", "⌫", "⌦", "⎋", "⏎", "␣", "⌨",
    "€", "£", "¥", "¢", "$", "¤", "₿", "∞", "≈", "≠", "≤", "≥", "±", "×", "÷", "√",
    "∑", "∏", "∂", "∫", "∮", "∆", "∇", "∈", "∉", "∋", "∌", "⊂", "⊃", "⊆", "⊇", "∪",
    "∩", "∧", "∨", "¬", "∀", "∃", "∄", "⊕", "⊗", "⊙", "°", "′", "″", "‴", "⁗", "‰",
    "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π"
  ]
}

export async function GET() {
  try {
    const response = await fetch('https://api.i-as.dev/api/symbols', {
      headers: {
        'Accept': 'application/json',
      },
      next: {
        revalidate: 3600 // Cache selama 1 jam
      }
    })
    
    if (!response.ok) {
      // Jika API gagal, gunakan data fallback
      console.warn('API tidak tersedia, menggunakan data fallback')
      return NextResponse.json(fallbackSymbols)
    }

    const data = await response.json()
    
    // Validasi struktur data
    if (!data.symbols || !Array.isArray(data.symbols)) {
      console.warn('Format data API tidak valid, menggunakan data fallback')
      return NextResponse.json(fallbackSymbols)
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('Symbols API Error:', error)
    
    // Gunakan data fallback jika terjadi error
    return NextResponse.json(fallbackSymbols)
  }
} 