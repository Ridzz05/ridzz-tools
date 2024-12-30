'use client'

import { Avatar } from '@nextui-org/react'
import { useEffect, useState, useRef } from 'react'

interface MessageProps {
  content: string
  role: 'user' | 'assistant'
}

export default function Message({ content, role }: MessageProps) {
  const userAvatarUrl = "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix"
  const aiAvatarUrl = "https://api.dicebear.com/7.x/bottts/svg?seed=Buddy"
  
  const [displayedContent, setDisplayedContent] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const previousContent = useRef('')

  // Fungsi untuk memformat teks
  const formatText = (text: string) => {
    return text
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Underline
      .replace(/__(.*?)__/g, '<u>$1</u>')
      // Code
      .replace(/`(.*?)`/g, '<code class="bg-default-100 px-1 py-0.5 rounded">$1</code>')
      // Strikethrough
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      // Heading (###)
      .replace(/###\s*(.*?)\n/g, '<h3 class="text-lg font-semibold mb-2">$1</h3>')
      // Line break
      .replace(/\n/g, '<br>')
  }

  useEffect(() => {
    if (!content) return
    
    if (role === 'assistant') {
      setIsTyping(true)
      
      if (previousContent.current && content.startsWith(previousContent.current)) {
        setDisplayedContent(previousContent.current)
        const newContent = content.slice(previousContent.current.length)
        let index = 0
        
        const interval = setInterval(() => {
          if (index <= newContent.length) {
            setDisplayedContent(formatText(previousContent.current + newContent.slice(0, index)))
            index++
          } else {
            clearInterval(interval)
            setIsTyping(false)
          }
        }, 15)

        return () => clearInterval(interval)
      } else {
        let index = 0
        const interval = setInterval(() => {
          if (index <= content.length) {
            setDisplayedContent(formatText(content.slice(0, index)))
            index++
          } else {
            clearInterval(interval)
            setIsTyping(false)
          }
        }, 15)

        return () => clearInterval(interval)
      }
    } else {
      setDisplayedContent(formatText(content))
    }

    previousContent.current = content
  }, [content, role])

  if (!content) return null

  return (
    <div className={`flex gap-3 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
      <Avatar
        src={role === 'user' ? userAvatarUrl : aiAvatarUrl}
        size="sm"
        className={`
          shadow-[2px_2px_0px_rgba(0,0,0,0.15)]
          ${role === 'assistant' 
            ? 'bg-primary-500 text-primary-foreground' 
            : 'bg-default-600 text-background'
          }
        `}
      />
      <div 
        className={`
          max-w-[75%] p-3 rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,0.15)]
          ${role === 'user' 
            ? 'bg-primary-500/20 dark:bg-primary-500/20' 
            : 'bg-default-100 dark:bg-default-50'
          }
        `}
      >
        <div 
          className={`
            ${role === 'user'
              ? 'text-primary-700 dark:text-primary-300'
              : 'text-foreground dark:text-foreground'
            }
            ${isTyping ? 'after:content-["|"] after:animate-blink after:ml-[1px] after:text-foreground dark:after:text-foreground' : ''}
          `}
          dangerouslySetInnerHTML={{ __html: displayedContent }}
        />
      </div>
    </div>
  )
}