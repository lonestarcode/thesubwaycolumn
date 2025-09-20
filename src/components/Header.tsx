'use client'

import Link from 'next/link'
import { useState } from 'react'

const Header = () => {
  const [email, setEmail] = useState('')
  const [showNewsletter, setShowNewsletter] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
    setShowNewsletter(false)
  }

  return (
    <header className="bg-blue-900 text-white fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="text-2xl md:text-3xl font-bold hover:text-yellow-400 transition-colors cursor-pointer">
            The Subway Column
          </Link>
          <p className="hidden xl:block text-sm font-medium text-yellow-400 italic">
            cultural commentary from America's greasy underbelly
          </p>
        </div>

        {/* Newsletter Signup */}
        <div className="flex items-center">
          {!showNewsletter ? (
            <button
              onClick={() => setShowNewsletter(true)}
              className="subscribe-btn"
              aria-label="Subscribe to Newsletter"
            >
              Subscribe to Newsletter
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-3 py-1.5 text-sm text-gray-900 rounded"
                required
                autoFocus
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                Subscribe
              </button>
              <button
                type="button"
                onClick={() => setShowNewsletter(false)}
                className="text-white hover:text-yellow-400 ml-2"
              >
                ✕
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header