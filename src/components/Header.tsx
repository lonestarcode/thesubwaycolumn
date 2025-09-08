'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'Arts & Entertainment', href: '/arts-entertainment' },
    { label: 'Food & Drink', href: '/food-drink' },
    { label: 'Column', href: '/column' },
    { label: 'NYC Stories', href: '/nyc-stories' },
  ]

  return (
    <header className="bg-blue-900 text-white fixed w-full top-0 z-50 h-16">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Hamburger Menu Button - Mobile Only */}
        <button 
          className="lg:hidden group relative"
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <Menu className="h-6 w-6" />
          {isMenuOpen && (
            <div className="absolute left-0 top-full mt-1 bg-blue-900 rounded shadow-lg z-50">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 hover:text-yellow-400 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </button>

        {/* Logo */}
        <div className="h-10 flex items-center">
          <span className="text-xl font-bold">The Subway Column</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 justify-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-yellow-400"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right-aligned Items */}
        <div className="flex items-center space-x-6">
          <Link href="/journal" className="font-bold italic hover:text-yellow-400">
            October, 2024 Journal
          </Link>
          <Link href="/subscribe" className="bg-yellow-400 text-blue-900 font-semibold py-1 px-3 rounded hover:bg-yellow-500">
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header