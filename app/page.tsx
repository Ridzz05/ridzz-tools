'use client'

import { useState } from 'react'
import ChatHistory from './components/chat/ChatHistory'
import ChatInput from './components/chat/ChatInput'
import NavbarComponent from './components/Navbar'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState("claude-3-sonnet-20240229")

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
    }

    setMessages(prev => [...prev, newMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: content,
          model: selectedModel 
        }),
      })

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: data.message,
        role: 'assistant',
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavbarComponent />
      <main className="flex-1 container mx-auto max-w-4xl p-4 flex flex-col">
        <div className="flex-1 flex flex-col h-[calc(100vh-180px)]">
          <div className="flex-1 overflow-y-auto py-4">
            <ChatHistory messages={messages} />
          </div>
          
          <div className="py-4 border-t border-divider">
            <ChatInput 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading}
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
