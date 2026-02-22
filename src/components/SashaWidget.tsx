'use client'

import { useState, useRef, useEffect } from 'react'
const API_URL = process.env.NEXT_PUBLIC_SASHA_API_URL || 'https://api.erinskidds.com'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isOffline?: boolean
  comingSoon?: boolean
}

const GREETING = "Hi! I'm Sasha, Erin's AI. Ask me anything about her — her work, projects, tech stack, or just say hi!"

export default function SashaWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: GREETING },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatId = useRef<string>('')

  // Restore or create chatId and messages from localStorage
  useEffect(() => {
    const storedId = localStorage.getItem('sasha_widget_chat_id')
    chatId.current = storedId || `widget-${Date.now()}`
    if (!storedId) localStorage.setItem('sasha_widget_chat_id', chatId.current)

    const stored = localStorage.getItem('sasha_widget_messages')
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Message[]
        if (parsed.length > 0) setMessages(parsed)
      } catch {}
    }
  }, [])

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sasha_widget_messages', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          chat_id: chatId.current,
          history: updatedMessages.slice(1, -1).map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I'm offline right now. You can reach Erin directly on:",
          isOffline: true,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Sasha, Erin's AI"
          aria-modal="true"
          className="sasha-panel"
        >
          {/* Header */}
          <div className="sasha-header">
            <div className="sasha-avatar" aria-hidden="true">S</div>
            <div className="sasha-header-text">
              <strong>Sasha</strong>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="sasha-close"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="sasha-messages" aria-live="polite" aria-label="Chat messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`sasha-msg ${msg.role === 'user' ? 'sasha-msg-user' : 'sasha-msg-bot'}`}
              >
                {msg.content}
                {msg.isOffline && (
                  <span className="block mt-1">
                    <a href="https://linkedin.com/in/erinskidds" target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a>
                    {' · '}
                    <a href="https://github.com/DudeThatsErin" target="_blank" rel="noopener noreferrer" className="underline">GitHub</a>
                  </span>
                )}
                {msg.comingSoon && (
                  <span className="block mt-1">
                    Erin is working on bringing me to life. Check back soon! In the meantime, you can visit her <a href="https://linkedin.com/in/erinskidds" target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a> or <a href="https://github.com/DudeThatsErin" target="_blank" rel="noopener noreferrer" className="underline">GitHub</a>.
                  </span>
                )}
              </div>
            ))}
            {loading && (
              <div className="sasha-msg sasha-msg-bot sasha-thinking">
                Thinking…
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="sasha-input-row">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything…"
              disabled={loading}
              aria-label="Message input"
              className="sasha-input"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="sasha-send"
            >
              ↑
            </button>
          </div>

          {/* Footer */}
          <p className="sasha-footer">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                const base = process.env.NEXT_PUBLIC_SASHA_FRONTEND_URL || 'http://localhost:3000'
                window.open(`${base}?import_chat=${chatId.current}`, '_blank', 'noopener,noreferrer')
              }}
            >
              Open full chat →
            </a>
          </p>
        </div>
      )}

      {/* Floating bubble */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close Sasha chat' : "Chat with Sasha, Erin's AI"}
        aria-expanded={open}
        className="sasha-bubble"
      >
        {open ? '×' : '💬'}
      </button>
    </>
  )
}
