import { useEffect, useRef, useState } from 'react'
import toyFrame from './assets/indian_kids_slate_frame.png'

type ChatMessage = {
  sender: 'user' | 'ai'
  text: string
}

const FRAME_WIDTH = 2400
const FRAME_HEIGHT = 1790
const CHAT_SLATE_BOUNDS = {
  x: 640,
  y: 352,
  width: 1132,
  height: 992,
}

function AgentIcon() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm text-white shadow-sm">
      AI
    </div>
  )
}

function AIMessage({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <AgentIcon />
      <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-slate-200 bg-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-800 shadow-sm">
        {text}
      </div>
    </div>
  )
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-blue-600 px-4 py-3 text-sm leading-relaxed text-white shadow-sm">
        {text}
      </div>
    </div>
  )
}

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "Hello! I am Shubham's AI assistant. Ask me about his professional background, projects, and technical strengths.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    const trimmedInput = input.trim()
    if (!trimmedInput || loading) {
      return
    }

    const nextUserMessage: ChatMessage = { sender: 'user', text: trimmedInput }
    setMessages((prev) => [...prev, nextUserMessage])
    setInput('')
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedInput }),
      })

      if (!response.ok) {
        throw new Error('Unable to get response from the server.')
      }

      const data: { response?: string } = await response.json()
      const aiText = (data.response ?? '').trim() || 'No response received.'

      setMessages((prev) => [...prev, { sender: 'ai', text: aiText }])
    } catch {
      const fallback =
        'Sorry, something went wrong while contacting the AI service.'
      setMessages((prev) => [...prev, { sender: 'ai', text: fallback }])
      setError('Request failed. Please verify the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await sendMessage()
  }

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat px-3 py-6 text-slate-900 sm:px-8 sm:py-8"
      style={{ backgroundImage: `url(${toyFrame})` }}
    >
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <header className="mb-3 text-center sm:mb-4">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 drop-shadow-sm sm:text-3xl">
            Ask Shubham&apos;s AI Agent
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-700">
            Portfolio intelligence assistant
          </p>
        </header>

        <div className="relative w-[min(95vw,1200px)] [aspect-ratio:2400/1790]">
          <img
            src={toyFrame}
            alt="Abacus and slate frame"
            className="h-full w-full object-contain drop-shadow-2xl"
          />

          <div
            aria-label="ChatSlate"
            className="absolute"
            style={{
              left: `${(CHAT_SLATE_BOUNDS.x / FRAME_WIDTH) * 100}%`,
              top: `${(CHAT_SLATE_BOUNDS.y / FRAME_HEIGHT) * 100}%`,
              width: `${(CHAT_SLATE_BOUNDS.width / FRAME_WIDTH) * 100}%`,
              height: `${(CHAT_SLATE_BOUNDS.height / FRAME_HEIGHT) * 100}%`,
              margin: 0,
              padding: 0,
            }}
          >
            <div className="flex h-full flex-col overflow-hidden rounded-sm bg-[#101213]/92">
              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
                {messages.map((message, index) =>
                  message.sender === 'ai' ? (
                    <AIMessage key={`ai-${index}`} text={message.text} />
                  ) : (
                    <UserMessage key={`user-${index}`} text={message.text} />
                  )
                )}

                {loading ? (
                  <AIMessage text="Reviewing portfolio details..." />
                ) : null}

                <div ref={endOfMessagesRef} />
              </div>

              <form onSubmit={handleSubmit} className="p-2 sm:p-3">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-500/60 bg-slate-900/95 px-2 py-2 shadow-lg transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/40 sm:px-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask about work experience, skills, or projects..."
                    className="h-10 flex-1 bg-transparent px-2 text-sm text-slate-100 outline-none placeholder:text-slate-400 sm:text-[0.95rem]"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-600"
                    aria-label="Send message"
                  >
                    Send
                    <span aria-hidden="true">➤</span>
                  </button>
                </div>
                {error ? (
                  <p className="mt-2 px-1 text-xs font-medium text-red-300">
                    {error}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
