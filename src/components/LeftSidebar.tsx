'use client'

import Link from 'next/link'
import { useState } from 'react'

const LeftSidebar = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const boroughs = [
    { name: 'Manhattan', href: '/boroughs/manhattan' },
    { name: 'Brooklyn', href: '/boroughs/brooklyn' },
    { name: 'Queens', href: '/boroughs/queens' },
    { name: 'Bronx', href: '/boroughs/bronx' },
    { name: 'Staten Island', href: '/boroughs/staten-island' },
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <div className="w-full bg-gray-300 p-6 flex flex-col rounded-lg"
         style={{
           borderTop: '3px solid #ffffff',
           borderLeft: '3px solid #ffffff',
           borderRight: '3px solid #808080',
           borderBottom: '3px solid #808080',
           boxShadow: 'inset -1px -1px #404040'
         }}>

      <div className="flex flex-col space-y-10 bg-gray-300 p-2"
           style={{
             borderTop: '1px solid #808080',
             borderLeft: '1px solid #808080',
             borderRight: '1px solid #ffffff',
             borderBottom: '1px solid #ffffff'
           }}>

        {/* Community Forums */}
        <div>
          <ul className="space-y-2">
            {boroughs.map((borough) => (
              <li key={borough.href} className="relative">
                <Link href={borough.href}
                      className="flex justify-between items-center py-2 px-3 bg-gray-300 rounded
                                 border border-gray-600 hover:bg-gray-350 font-bold">
                  {borough.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscribe Section */}
        <div>
          <div className="bg-white border border-gray-600 p-4">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Subscribe to The Subway Column</h3>
            <p className="text-xs text-gray-600 mb-4">
              Get the latest NYC news, culture, and opinions delivered to your inbox.
            </p>

            {subscribed ? (
              <div className="bg-green-50 border border-green-300 rounded p-2">
                <p className="text-xs text-green-700 font-semibold">✓ Thanks for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded mb-3 focus:outline-none focus:border-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-3 py-2 rounded text-xs font-bold hover:bg-red-700 transition-colors"
                >
                  Subscribe Now
                </button>
              </form>
            )}

            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Benefits include:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Daily newsletter</li>
                <li>• Breaking news alerts</li>
                <li>• Exclusive content</li>
                <li>• Ad-free reading</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar