'use client'

import Link from 'next/link'

const Header = () => {
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

        {/* CTA */}
        <div className="flex items-center">
          <button className="subscribe-btn" aria-label="Subscribe">Subscribe</button>
        </div>
      </div>
    </header>
  )
}

export default Header