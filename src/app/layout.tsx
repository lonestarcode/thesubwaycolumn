import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'NYC Neighborhood Forums',
  description: 'Your community hub for NYC neighborhoods, events, jobs, and apartments',
  keywords: 'NYC, New York City, neighborhoods, forums, community, Manhattan, Brooklyn, Queens, Bronx, Staten Island',
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