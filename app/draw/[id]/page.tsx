'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import ShareBar from '@/components/ShareBar'
import '@excalidraw/excalidraw/index.css'

const ExcalidrawWrapper = dynamic(
  async () => {
    const mod = await import('@excalidraw/excalidraw')
    const { Excalidraw, MainMenu, WelcomeScreen } = mod

    function Wrapper({ initialData, onChange }: any) {
      return (
        <Excalidraw initialData={initialData} onChange={onChange} name="Inkwell drawing">
          <MainMenu>
            <MainMenu.DefaultItems.LoadScene />
            <MainMenu.DefaultItems.Export />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.Separator />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
            <MainMenu.DefaultItems.ToggleTheme />
            <MainMenu.Separator />
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.Separator />
            <MainMenu.ItemLink href="https://karki-niraj.com.np/">
              Made by Niraj Karki
            </MainMenu.ItemLink>
          </MainMenu>

          <WelcomeScreen>
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.Heading>
                Start drawing
              </WelcomeScreen.Center.Heading>
              <WelcomeScreen.Center.Menu>
                <WelcomeScreen.Center.MenuItemLoadScene />
              </WelcomeScreen.Center.Menu>
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      )
    }

    return Wrapper
  },
  { ssr: false }
)

export default function DrawPage() {
  const params = useParams()
  const id = params.id as string

  const [initialData, setInitialData] = useState<any>(null)
  const [loaded, setLoaded] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    fetch(`/api/board/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.content) {
          try {
            const elements = JSON.parse(data.content)
            setInitialData({ elements })
          } catch {
            setInitialData({ elements: [] })
          }
        } else {
          setInitialData({ elements: [] })
        }
        setLoaded(true)
      })
  }, [id])

  const handleChange = useCallback(
    (elements: readonly any[]) => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(() => {
        fetch(`/api/board/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: JSON.stringify(elements) }),
        })
      }, 1000)
    },
    [id]
  )

  if (!loaded) {
    return (
      <div style={{ background: '#FAF7F0', color: '#6B6456' }} className="h-screen flex items-center justify-center">
        Loading canvas…
      </div>
    )
  }

  return (
    <div className="inkwell-canvas h-screen w-screen relative">
      <ShareBar id={id} type="draw" />
      <ExcalidrawWrapper
        initialData={initialData}
        onChange={(elements: readonly any[]) => handleChange(elements)}
      />
    </div>
  )
}