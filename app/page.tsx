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
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Esketchpad',
            url: 'https://esketchpad.karki-niraj.com.np/',
            applicationCategory: 'DesignApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description:
              'A free online whiteboard and notepad. Draw, sketch, or write instantly with no account needed — just create and share a link.',
            featureList: [
              'No sign-up required',
              'Free online drawing canvas',
              'Free online notepad',
              'Shareable links',
              'Rename your link',
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Do I need to create an account?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Esketchpad never requires sign-up. Anyone with the link can open, view, and edit a drawing or note.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long is my content saved?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Your drawing or note stays saved as long as it's accessed within 90 days. Boards untouched for longer than that are automatically removed.",
                },
              },
              {
                '@type': 'Question',
                name: 'Can other people edit my note or drawing?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes — anyone with the link has full edit access, the same way a shared document works. Only share links with people you trust.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I change my link to something memorable?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Yes. Every drawing and note has a 'Rename link' option, so you can replace the random link with a custom one of your choice.",
                },
              },
            ],
          }),
        }}
      />

      <main
        style={{ background: '#FAF7F0' }}
        className="min-h-screen flex flex-col items-center px-4 sm:px-6"
      >
        {/* ── Hero ── */}
        <section className="flex flex-col items-center justify-center text-center pt-16 sm:pt-24 pb-16 w-full max-w-2xl">
          <h1
            style={{ fontFamily: 'Georgia, serif', color: '#1B1B1F' }}
            className="text-4xl sm:text-6xl font-medium mb-3 tracking-tight"
          >
            Esketchpad
          </h1>
          <p style={{ color: '#6B6456' }} className="mb-10 text-base sm:text-lg max-w-md">
            A free online whiteboard and notepad. Draw or write instantly —
            no sign-up, just a link.
          </p>

          <div className="flex gap-4 flex-wrap justify-center w-full">
            <button
              onClick={() => startNew('draw')}
              disabled={loading !== null}
              style={{ background: '#C4502E', color: '#FFF6EE' }}
              className="px-8 py-4 rounded-xl text-base sm:text-lg font-medium disabled:opacity-50 min-w-[180px] flex-1 sm:flex-none max-w-[220px] hover:opacity-90 transition-opacity"
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
              className="px-8 py-4 rounded-xl text-base sm:text-lg font-medium disabled:opacity-50 min-w-[180px] flex-1 sm:flex-none max-w-[220px] hover:bg-[#2D5C4D] hover:text-[#FAF7F0] transition-colors"
            >
              {loading === 'notes' ? 'Creating…' : 'Write a note'}
            </button>
          </div>
        </section>

        {/* ── What is Esketchpad ── */}
        <section className="w-full max-w-2xl py-12 border-t" style={{ borderColor: '#E5DFD0' }}>
          <h2
            style={{ color: '#1B1B1F' }}
            className="text-2xl sm:text-3xl font-semibold mb-4 text-center"
          >
            A free online whiteboard and notepad, with no account needed
          </h2>
          <p style={{ color: '#6B6456' }} className="text-base sm:text-lg leading-relaxed text-center">
            Esketchpad gives you two simple tools in one place: an{' '}
            <strong>online drawing canvas</strong> for sketches and diagrams,
            and a distraction-free <strong>online notepad</strong> for quick
            writing. There's no sign-up, no installation, and nothing to
            configure — open the page, start creating, and share what you
            made with a single link.
          </p>
        </section>

        {/* ── How it works ── */}
        <section className="w-full max-w-2xl py-12 border-t" style={{ borderColor: '#E5DFD0' }}>
          <h2
            style={{ color: '#1B1B1F' }}
            className="text-2xl sm:text-3xl font-semibold mb-8 text-center"
          >
            How it works
          </h2>
          <ol className="space-y-6">
            {[
              {
                title: 'Choose draw or write',
                body: 'Pick "Start drawing" for a full canvas with shapes, arrows, and freehand sketching, or "Write a note" for a clean text page.',
              },
              {
                title: 'Create instantly',
                body: 'No account, no email, no password. A new private link is generated for you immediately.',
              },
              {
                title: 'Share your link',
                body: 'Send the link to anyone — they can view and edit it right away, no sign-up required on their end either.',
              },
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span
                  style={{ background: '#C4502E', color: '#FFF6EE' }}
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 style={{ color: '#1B1B1F' }} className="font-semibold text-base sm:text-lg mb-1">
                    {step.title}
                  </h3>
                  <p style={{ color: '#6B6456' }} className="text-sm sm:text-base leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── FAQ ── */}
        <section className="w-full max-w-2xl py-12 border-t" style={{ borderColor: '#E5DFD0' }}>
          <h2
            style={{ color: '#1B1B1F' }}
            className="text-2xl sm:text-3xl font-semibold mb-8 text-center"
          >
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Do I need to create an account?',
                a: 'No. Esketchpad never requires sign-up. Anyone with the link can open, view, and edit a drawing or note.',
              },
              {
                q: 'How long is my content saved?',
                a: "Your drawing or note stays saved as long as it's accessed within 90 days. Boards untouched for longer than that are automatically removed.",
              },
              {
                q: 'Can other people edit my note or drawing?',
                a: 'Yes — anyone with the link has full edit access, the same way a shared document works. Only share links with people you trust.',
              },
              {
                q: 'Can I change my link to something memorable?',
                a: "Yes. Every drawing and note has a 'Rename link' option, so you can replace the random link with a custom one of your choice.",
              },
            ].map((item, i) => (
              <div key={i}>
                <h3 style={{ color: '#1B1B1F' }} className="font-semibold text-base sm:text-lg mb-1">
                  {item.q}
                </h3>
                <p style={{ color: '#6B6456' }} className="text-sm sm:text-base leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="w-full max-w-2xl py-10 text-center">
          <p style={{ color: '#9A8F73' }} className="text-xs sm:text-sm">
            Esketchpad — built by{' '}
            <a
              href="https://karki-niraj.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#2D5C4D' }}
              className="underline"
            >
              Niraj Karki
            </a>
          </p>
        </footer>
      </main>
    </>
  )
}