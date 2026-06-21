'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState<'draw' | 'notes' | null>(null)

  async function startNew(type: 'draw' | 'notes') {
    setLoading(type)
    const res = await fetch('/api/board/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    })
    const data = await res.json()
    router.push(`/${type}/${data.id}`)
  }

  return (
    <main
      style={{ background: '#FAF7F0' }}
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      <h1
        style={{ fontFamily: 'Georgia, serif', color: '#1B1B1F' }}
        className="text-6xl font-medium mb-3 tracking-tight"
      >
        Esketchpad
      </h1>
      <p style={{ color: '#6B6456' }} className="mb-12 text-lg">
        Draw or write. No sign-up. Just a link.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => startNew('draw')}
          disabled={loading !== null}
          style={{ background: '#C4502E', color: '#FFF6EE' }}
          className="px-8 py-4 rounded-xl text-lg font-medium disabled:opacity-50 min-w-[200px] hover:opacity-90 transition-opacity"
        >
          {loading === 'draw' ? 'Creating…' : 'Start drawing'}
        </button>

        <button
          onClick={() => startNew('notes')}
          disabled={loading !== null}
          style={{
            background: 'transparent',
            color: '#2D5C4D',
            border: '1.5px solid #2D5C4D',
          }}
          className="px-8 py-4 rounded-xl text-lg font-medium disabled:opacity-50 min-w-[200px] hover:bg-[#2D5C4D] hover:text-[#FAF7F0] transition-colors"
        >
          {loading === 'notes' ? 'Creating…' : 'Write a note'}
        </button>
      </div>
    </main>
  )
}