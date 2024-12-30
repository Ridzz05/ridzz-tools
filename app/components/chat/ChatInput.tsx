'use client'

import { useState, useEffect } from 'react'
import { Button, Textarea } from '@nextui-org/react'
import { SendIcon } from './Icons'
import dynamic from 'next/dynamic'

// Lazy load components
const ModelSelector = dynamic(() => import('./ModelSelector'), {
  loading: () => <div>Loading...</div>,
  ssr: false
})

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
  selectedModel: string
  onModelChange: (model: string) => void
}

export default function ChatInput({ 
  onSendMessage, 
  isLoading, 
  selectedModel, 
  onModelChange 
}: ChatInputProps) {
  const [input, setInput] = useState('')
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  useEffect(() => {
    // Deteksi ketika keyboard muncul/hilang
    const handleResize = () => {
      const isKeyboard = window.visualViewport?.height && window.innerHeight
      setIsKeyboardVisible(!!isKeyboard)
    }

    // Tambahkan event listener untuk visualViewport
    window.visualViewport?.addEventListener('resize', handleResize)
    window.visualViewport?.addEventListener('scroll', handleResize)

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize)
      window.visualViewport?.removeEventListener('scroll', handleResize)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    onSendMessage(input)
    setInput('')
  }

  return (
    <div 
      className={`space-y-4 ${
        isKeyboardVisible 
          ? 'fixed bottom-0 left-0 right-0 bg-background p-4' 
          : ''
      }`}
      style={{
        transform: isKeyboardVisible 
          ? `translateY(-${window.visualViewport?.height ?? 0}px)` 
          : 'none'
      }}
    >
      <div className="w-full">
        <ModelSelector 
          selectedModel={selectedModel}
          onModelChange={onModelChange}
        />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan..."
          disabled={isLoading}
          className="flex-1"
          size="lg"
          minRows={1}
          maxRows={4}
          variant="flat"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
          classNames={{
            input: "bg-transparent text-foreground",
            inputWrapper: [
              "bg-default-100",
              "dark:bg-default-50",
              "hover:bg-default-200",
              "dark:hover:bg-default-100",
              "shadow-[2px_2px_0px_rgba(0,0,0,0.15)]",
              "group-data-[focused=true]:shadow-none",
              "group-data-[focused=true]:translate-x-[2px]",
              "group-data-[focused=true]:translate-y-[2px]",
              "transition-all",
              "duration-200",
              "!cursor-text",
              "border-0",
              "min-h-[80px]",
              "py-3"
            ],
          }}
        />
        <Button
          type="submit"
          isLoading={isLoading}
          size="lg"
          isIconOnly
          className="bg-primary-500 text-white font-semibold shadow-[2px_2px_0px_rgba(0,0,0,0.15)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:bg-primary-600 transition-all duration-200 min-w-unit-12 h-[80px] border-0"
        >
          <SendIcon />
        </Button>
      </form>
    </div>
  )
}