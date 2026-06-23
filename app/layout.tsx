import type { Metadata } from "next";
import { Geist, Geist_Mono, Kalam } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kalam = Kalam({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-kalam",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://esketchpad.karki-niraj.com.np/"),
  title: {
    default: "Esketchpad — Free Online Whiteboard & Notepad, No Sign-Up",
    template: "%s | Esketchpad",
  },
  description:
    "Esketchpad is a free online whiteboard and notepad. Draw, sketch, or write instantly with no account needed — just create and share a link.",
  keywords: [
    "online whiteboard no sign up",
    "free drawing tool online",
    "online notepad share link",
    "esketchpad",
    "sketch online free",
    "shareable notes no account",
    "draw online free",
    "simple online notepad",
  ],
  authors: [{ name: "Niraj Karki", url: "https://karki-niraj.com.np/" }],
  creator: "Niraj Karki",
  applicationName: "Esketchpad",
  openGraph: {
    title: "Esketchpad — Free Online Whiteboard & Notepad, No Sign-Up",
    description:
      "Draw, sketch, or write instantly. No account needed — just create and share a link.",
    url: "https://esketchpad.karki-niraj.com.np/",
    siteName: "Esketchpad",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Esketchpad — Free Online Whiteboard and Notepad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Esketchpad — Free Online Whiteboard & Notepad, No Sign-Up",
    description:
      "Draw, sketch, or write instantly. No account needed — just create and share a link.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://esketchpad.karki-niraj.com.np/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${kalam.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}