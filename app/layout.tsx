import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ask GAR - Anonymous Q&A',
  description: 'Ask questions anonymously and share answers with your community',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="%237c5b9d"/><text x="50" y="65" font-size="60" font-weight="bold" fill="white" text-anchor="middle">?</text></svg>',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#7c5b9d',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-background">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
