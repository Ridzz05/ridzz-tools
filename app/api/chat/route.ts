import { NextResponse } from 'next/server'

const API_URL = "https://api.i-as.dev/api/ai/opengpt"

type AvailableModel = 
  | "gpt-4o-mini"
  | "gpt-4-turbo-2024-04-09"
  | "gpt-4o-2024-08-06"
  | "grok-2"
  | "grok-2-mini"
  | "grok-beta"
  | "claude-3-opus-20240229"
  | "claude-3-sonnet-20240229"
  | "claude-3-5-sonnet-20240620"
  | "claude-3-5-sonnet-20241022"
  | "gemini-1.5-flash-exp-0827"

const DEFAULT_MODEL: AvailableModel = "claude-3-sonnet-20240229"

export async function POST(request: Request) {
  try {
    const { message, model = DEFAULT_MODEL } = await request.json()

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: message,
        prompt: "",
        models: model as AvailableModel
      }),
    })

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`)
    }

    const data = await response.json()
    
    const aiResponse = data.answer || "Maaf, saya tidak dapat memproses permintaan Anda."

    return NextResponse.json({ message: aiResponse })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memproses permintaan' },
      { status: 500 }
    )
  }
}
