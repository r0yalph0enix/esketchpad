'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import ShareBar from '@/components/ShareBar'

const LINE_HEIGHT = 32 // px — must match the repeating background size below

export default function NotesPage() {
  const params = useParams()
  const id = params.id as string

  const [text, setText] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [status, setStatus] = useState<'saved' | 'saving'>('saved')
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    fetch(`/api/board/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setText(data.content || '')
        setLoaded(true)
      })
  }, [id])

  function handleChange(value: string) {
    setText(value)
    setStatus('saving')
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      await fetch(`/api/board/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: value }),
      })
      setStatus('saved')
    }, 800)
  }

  if (!loaded) {
    return (
      <div style={{ background: '#FAF7F0', color: '#6B6456' }} className="h-screen flex items-center justify-center">
        Loading note…
      </div>
    )
  }

  return (
    <div style={{ background: '#EFE9E0' }} className="h-screen w-screen flex flex-col">
      <ShareBar id={id} type="notes" status={status} />

      <div className="flex-1 relative overflow-hidden">
        {/* Paper sheet */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            margin: '0 auto',
            maxWidth: '900px',
            background: `
              linear-gradient(
                to bottom,
                transparent ${LINE_HEIGHT - 1}px,
                #D8CDB8 ${LINE_HEIGHT - 1}px,
                #D8CDB8 ${LINE_HEIGHT}px,
                transparent ${LINE_HEIGHT}px
              )
            `,
            backgroundColor: '#FAF7F0',
            backgroundSize: `100% ${LINE_HEIGHT}px`,
            backgroundPositionY: '8px',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          {/* Red margin line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '64px',
              width: '1px',
              background: '#D99B8A',
            }}
          />

          <textarea
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Start typing…"
            spellCheck={false}
            style={{
              position: 'absolute',
              inset: 0,
              paddingTop: '8px',
              paddingLeft: '84px',
              paddingRight: '32px',
              background: 'transparent',
              color: '#2A2A28',
              fontFamily: "'Kalam', cursive, sans-serif",
              fontSize: '18px',
              lineHeight: `${LINE_HEIGHT}px`,
              border: 'none',
              outline: 'none',
              resize: 'none',
              overflowY: 'auto',
            }}
            autoFocus
          />
        </div>
      </div>
    </div>
  )
}