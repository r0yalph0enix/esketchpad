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
  const [open, setOpen] = useState(false)
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
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close share panel' : 'Open share panel'}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 60,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: open ? '#1B1B1F' : '#C4502E',
          color: '#FFF6EE',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          cursor: 'pointer',
          transition: 'background 0.2s, transform 0.2s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
      >
        +
      </button>

      {/* Expandable panel */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '82px',
            right: '20px',
            zIndex: 59,
            background: '#1B1B1F',
            color: '#F0F0F0',
            borderRadius: '14px',
            padding: '14px',
            minWidth: '220px',
            maxWidth: 'calc(100vw - 40px)',
            boxShadow: '0 8px 28px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            fontSize: '14px',
          }}
        >
          {status && (
            <span style={{ fontSize: '12px', color: '#9A8F73' }}>
              {status === 'saving' ? 'Saving…' : 'Saved'}
            </span>
          )}

          {!renaming ? (
            <>
              <div
                style={{
                  fontSize: '13px',
                  color: '#C9C4B5',
                  wordBreak: 'break-all',
                }}
              >
                /{type}/{id}
              </div>

              <button
                onClick={() => setRenaming(true)}
                style={{
                  background: '#2D2D33',
                  color: '#F0F0F0',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                Rename link
              </button>

              <button
                onClick={copyLink}
                style={{
                  background: '#C4502E',
                  color: '#FFF6EE',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {copied ? 'Copied!' : 'Copy share link'}
              </button>
            </>
          ) : (
            <>
              <input
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
                style={{
                  background: '#2D2D33',
                  color: '#F0F0F0',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  fontSize: '14px',
                  outline: 'none',
                  width: '100%',
                }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={submitRename}
                  style={{
                    flex: 1,
                    background: '#2D5C4D',
                    color: '#FAF7F0',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setRenaming(false)}
                  style={{
                    flex: 1,
                    background: '#2D2D33',
                    color: '#F0F0F0',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
              {error && (
                <span style={{ color: '#E24B4A', fontSize: '12px' }}>
                  {error}
                </span>
              )}
            </>
          )}
        </div>
      )}
    </>
  )
}