import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Esketchpad',
    short_name: 'Esketchpad',
    description: 'Free online whiteboard and notepad. No sign-up required.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF7F0',
    theme_color: '#C4502E',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}