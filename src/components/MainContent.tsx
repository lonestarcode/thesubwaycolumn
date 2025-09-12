'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/types'

const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
}

const MainContent = ({ articles = [] }: { articles?: Article[] }) => {
  return (
    <div className="w-full bg-gray-50 h-full overflow-hidden flex flex-col">
      {/* Featured Image Section - Larger height */}
      <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
        <div className="relative w-full h-[400px]">
          <Image 
            src="/spiderweb.jpeg"
            alt="Magazine Cover" 
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Articles Section - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {articles.length > 0 ? (
            articles.slice(0, 5).map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`}>
                <article className="border-b border-gray-200 pb-4 last:border-b-0 cursor-pointer hover:bg-gray-100 p-3 rounded transition-colors">
                  <h3 className="text-base font-bold text-gray-900 mb-1 leading-tight font-serif hover:text-red-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-red-600 font-semibold mb-2">
                    By {article.author}
                  </p>
                  <p className="text-gray-700 text-xs leading-relaxed mb-2 font-serif italic line-clamp-2">
                    {stripHtml(article.content).substring(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      {new Date(article.created_at).toLocaleDateString()}
                    </span>
                    <span className="text-red-600 text-xs font-semibold">
                      Read →
                    </span>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">Articles coming soon</p>
            </div>
          )}
        </div>

        {/* Opinion Submission - Smaller */}
        <div className="mt-6 bg-red-50 p-3 rounded border border-red-200">
          <p className="text-xs text-gray-700 mb-2">Share your NYC perspective</p>
          <button className="bg-red-600 text-white px-3 py-1.5 rounded text-xs hover:bg-red-700 transition-colors font-semibold">
            Submit Entry
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainContent