'use client'

import Link from 'next/link'

const Header = () => {

  return (
    <header className="bg-blue-900 text-white fixed w-full top-0 z-50 h-16">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="h-10 flex items-center">
          <Link href="/" className="text-xl font-bold hover:text-yellow-400 transition-colors cursor-pointer">
            The Subway Column
          </Link>
        </div>

        {/* Right-aligned Items */}
        <div className="flex items-center space-x-6">
          <Link href="/subscribe" className="bg-yellow-400 text-blue-900 font-semibold py-1 px-3 rounded hover:bg-yellow-500">
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header