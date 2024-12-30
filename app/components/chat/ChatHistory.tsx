import Message from './Message'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
}

interface ChatHistoryProps {
  messages: Message[]
}

export default function ChatHistory({ messages }: ChatHistoryProps) {
  return (
    <div className="space-y-6">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full space-y-8 py-12">
          <h3 className="text-3xl font-bold text-white">
            <span className="inline-block animate-wave-text [animation-delay:0.1s]">S</span>
            <span className="inline-block animate-wave-text [animation-delay:0.2s]">e</span>
            <span className="inline-block animate-wave-text [animation-delay:0.3s]">l</span>
            <span className="inline-block animate-wave-text [animation-delay:0.4s]">a</span>
            <span className="inline-block animate-wave-text [animation-delay:0.5s]">m</span>
            <span className="inline-block animate-wave-text [animation-delay:0.6s]">a</span>
            <span className="inline-block animate-wave-text [animation-delay:0.7s]">t</span>
            <span className="inline-block animate-wave-text [animation-delay:0.8s]"> </span>
            <span className="inline-block animate-wave-text [animation-delay:0.9s]">d</span>
            <span className="inline-block animate-wave-text [animation-delay:1.0s]">a</span>
            <span className="inline-block animate-wave-text [animation-delay:1.1s]">t</span>
            <span className="inline-block animate-wave-text [animation-delay:1.2s]">a</span>
            <span className="inline-block animate-wave-text [animation-delay:1.3s]">n</span>
            <span className="inline-block animate-wave-text [animation-delay:1.4s]">g</span>
            <span className="inline-block animate-wave-text [animation-delay:1.5s]">!</span>
          </h3>
          <div className="space-y-4 text-foreground/90">
            <p className="flex items-center transform translate-y-0 opacity-0 animate-slide-up [animation-delay:200ms] animate-fill-forwards">
              <span className="inline-flex p-2 mr-3 bg-pink-500/20 rounded-full">
                <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
              </span>
              Pilih model AI yang ingin Anda gunakan
            </p>
            <p className="flex items-center transform translate-y-0 opacity-0 animate-slide-up [animation-delay:400ms] animate-fill-forwards">
              <span className="inline-flex p-2 mr-3 bg-purple-500/20 rounded-full">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              </span>
              Ketik pesan Anda di kolom input
            </p>
            <p className="flex items-center transform translate-y-0 opacity-0 animate-slide-up [animation-delay:600ms] animate-fill-forwards">
              <span className="inline-flex p-2 mr-3 bg-purple-500/20 rounded-full">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              </span>
              Mulai percakapan dengan AI!
            </p>
          </div>
        </div>
      )}
      {messages.map((message) => (
        <Message
          key={message.id}
          content={message.content}
          role={message.role}
        />
      ))}
    </div>
  )
}