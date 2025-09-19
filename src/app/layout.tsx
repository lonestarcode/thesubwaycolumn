import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'The Subway Column',
  description: 'NYC news, culture, and opinions',
  keywords: 'NYC, New York City, news, culture, opinions, magazine',
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-yellow-50 text-gray-800">
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}