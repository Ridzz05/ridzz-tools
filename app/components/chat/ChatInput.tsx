'use client'

import { useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import { SendIcon } from './Icons'
import ModelSelector from './ModelSelector'

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    onSendMessage(input)
    setInput('')
  }

  return (
    <div className="space-y-4">
      <div className="w-full">
        <ModelSelector 
          selectedModel={selectedModel}
          onModelChange={onModelChange}
        />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan..."
          disabled={isLoading}
          className="flex-1"
          size="lg"
          variant="flat"
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
              "border-0"
            ]
          }}
        />
        <Button
          type="submit"
          isLoading={isLoading}
          size="lg"
          isIconOnly
          className="bg-primary-500 text-white font-semibold shadow-[2px_2px_0px_rgba(0,0,0,0.15)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:bg-primary-600 transition-all duration-200 min-w-unit-12 border-0"
        >
          <SendIcon />
        </Button>
      </form>
    </div>
  )
}