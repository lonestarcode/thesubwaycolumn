'use client'

import Link from 'next/link'
import { Article } from '@/types'

const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
}

const RightSidebar = ({ articles = [] }: { articles?: Article[] }) => {
  return (
    <aside className="hidden lg:block fixed top-16 right-0 w-[22%] bg-gray-50 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-6">
        
        <div className="space-y-6">
          {articles.length > 0 ? (
            // Show dynamic articles from database
            articles.slice(0, 5).map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`}>
                <article className="border-b border-gray-300 pb-6 last:border-b-0 cursor-pointer hover:bg-gray-100 p-4 rounded transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight font-serif hover:text-red-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-red-600 font-semibold mb-3">
                    By {article.author}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3 font-serif italic">
                    {stripHtml(article.content).substring(0, 150)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      {new Date(article.created_at).toLocaleDateString()}
                    </span>
                    <span className="text-red-600 text-sm font-semibold">
                      Read More →
                    </span>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            // Show "Articles coming soon" message
            <div className="text-center py-8">
              <p className="text-gray-600">Articles coming soon</p>
            </div>
          )}
        </div>

        {/* Opinion Submission */}
        <div className="mt-8 bg-red-50 p-4 rounded border border-red-200">
          <p className="text-sm text-gray-700 mb-3">Share your perspective on NYC life, politics, and culture.</p>
          <button className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors font-semibold">
            Submit Note
          </button>
        </div>
      </div>
    </aside>
  )
}

export default RightSidebar