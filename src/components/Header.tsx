 'use client'

import Link from 'next/link'
import { useState } from 'react'
import LeftSidebar from './LeftSidebar'

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <header className="bg-blue-900 text-white fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="text-2xl md:text-3xl font-bold hover:text-yellow-400 transition-colors cursor-pointer">
            The Subway Column
          </Link>
          <p className="hidden xl:block text-sm font-medium text-yellow-400 italic">
            NYC news, culture, and opinions
          </p>
        </div>

        {/* Mobile hamburger placeholder and CTA */}
        <div className="flex items-center space-x-3">
          {/* Hamburger visible on non-desktop (hidden on xl+) */}
          <button onClick={() => setDrawerOpen(true)} className="xl:hidden bg-blue-800 p-2 rounded text-white" aria-label="Open menu" aria-expanded={drawerOpen}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button className="hidden xl:inline-block subscribe-btn" aria-label="Subscribe">Subscribe</button>
        </div>
      </div>

      {/* Drawer for non-desktop screens */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          {/* Backdrop sits below the panel */}
          <button aria-label="Close dropdown" className="fixed inset-0 bg-black/40 z-30" onClick={() => setDrawerOpen(false)} />

          {/* Centered dropdown below header (panel above backdrop but below header) */}
          <div className="relative z-40">
            <div className="container mx-auto px-4">
              <div className="mt-16 max-w-3xl mx-auto bg-yellow-50 rounded shadow-lg overflow-hidden relative">
                {/* Close button positioned at top-right so there is no header text space */}
                <button onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="absolute right-4 top-4 p-2">
                  ✕
                </button>
                <div className="pt-8 px-4 pb-4">
                  <LeftSidebar compact onNavigate={() => setDrawerOpen(false)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header