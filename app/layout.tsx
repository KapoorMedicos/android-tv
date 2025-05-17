import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Android TV',
  description: 'Created with Cursor ai and v0',
  generator: 'v0.dev, Cursor ai',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
