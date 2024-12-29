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
        <div className="flex flex-col items-center justify-center h-full space-y-4 animate-fade-in">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-lg blur opacity-25 animate-pulse"></div>
            <div className="relative px-7 py-4 bg-background/80 backdrop-blur-sm rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,0.15)] border border-foreground/10">
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient bg-300%">
                Selamat datang di K.A Chat!
              </h3>
              <div className="mt-3 space-y-2 text-foreground/80">
                <p className="flex items-center">
                  <span className="inline-block w-2 h-2 mr-2 bg-pink-500 rounded-full animate-ping"></span>
                  Pilih model AI yang ingin Anda gunakan
                </p>
                <p className="flex items-center">
                  <span className="inline-block w-2 h-2 mr-2 bg-purple-500 rounded-full animate-ping [animation-delay:0.2s]"></span>
                  Ketik pesan Anda di kolom input
                </p>
                <p className="flex items-center">
                  <span className="inline-block w-2 h-2 mr-2 bg-cyan-500 rounded-full animate-ping [animation-delay:0.4s]"></span>
                  Mulai percakapan dengan AI!
                </p>
              </div>
            </div>
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