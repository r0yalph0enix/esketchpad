'use client'

import { useState } from 'react'

export default function ShareBar({
  id,
  type,
  status,
}: {
  id: string
  type: 'draw' | 'notes'
  status?: 'saved' | 'saving'
}) {
  const [renaming, setRenaming] = useState(false)
  const [newId, setNewId] = useState(id)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  async function submitRename() {
    setError('')
    const res = await fetch(`/api/board/${id}/rename`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newId }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error)
      return
    }
    window.location.href = `/${type}/${data.id}`
  }

  return (
    <div className="absolute top-3 right-3 z-50 flex items-center gap-2 bg-neutral-900/90 backdrop-blur rounded-lg px-3 py-2 text-sm text-neutral-200 shadow-lg border border-neutral-800">
      {status && (
        <span className="text-xs text-neutral-500">
          {status === 'saving' ? 'Saving…' : 'Saved'}
        </span>
      )}

      {!renaming ? (
        <>
          <span className="text-neutral-400">/{type}/{id}</span>
          <button
            onClick={() => setRenaming(true)}
            className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            Rename
          </button>
          <button
            onClick={copyLink}
            className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-500 transition-colors"
          >
            {copied ? 'Copied!' : 'Share'}
          </button>
        </>
      ) : (
        <>
          <input
            value={newId}
            onChange={(e) => setNewId(e.target.value)}
            className="bg-neutral-800 px-2 py-1 rounded outline-none w-32"
          />
          <button onClick={submitRename} className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500">
            Save
          </button>
          <button onClick={() => setRenaming(false)} className="px-2 py-1 rounded bg-neutral-800">
            Cancel
          </button>
          {error && <span className="text-red-400 text-xs">{error}</span>}
        </>
      )}
    </div>
  )
}