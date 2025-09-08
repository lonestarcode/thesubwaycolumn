'use client'

import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsLoading(false)
    setEmail('')
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
      <div className="magazine-container">
        <div className="max-w-2xl mx-auto text-center text-white">
          <Mail className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8 text-purple-100">
            Get the latest articles and exclusive content delivered straight to your inbox.
          </p>
          
          {isSubmitted ? (
            <div className="flex items-center justify-center space-x-2 text-green-100">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg font-medium">Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-300"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
          
          <p className="mt-4 text-sm text-purple-100">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSignup