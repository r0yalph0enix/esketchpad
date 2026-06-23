import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/draw/', '/notes/', '/api/'],
      },
    ],
    sitemap: 'https://esketchpad.karki-niraj.com.np/sitemap.xml',
  }
}