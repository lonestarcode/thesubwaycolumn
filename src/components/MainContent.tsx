'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/types'

const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
}

const MainContent = ({ articles = [] }: { articles?: Article[] }) => {
  const mostRecentArticle = articles[0]
  const otherArticles = articles.slice(1, 5)

  return (
    <div className="w-full bg-gray-50 h-full overflow-hidden flex">
      {/* Left Section - Most Recent Article */}
      <div className="w-1/2 h-full border-r border-gray-200 flex flex-col">
        {mostRecentArticle ? (
          <>
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              <Link href={`/article/${mostRecentArticle.slug}`}>
                <article className="cursor-pointer">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight font-serif hover:text-red-600 transition-colors">
                    {mostRecentArticle.title}
                  </h1>
                  <p className="text-sm text-red-600 font-semibold mb-4">
                    By {mostRecentArticle.author}
                  </p>
                  <p className="text-gray-700 text-base leading-relaxed mb-4 font-serif italic">
                    {stripHtml(mostRecentArticle.content).substring(0, 400)}...
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      {new Date(mostRecentArticle.created_at).toLocaleDateString()}
                    </span>
                    <span className="text-red-600 text-sm font-semibold hover:underline">
                      Continue Reading →
                    </span>
                  </div>
                </article>
              </Link>
            </div>
            
            {/* Bottom Image - Fixed at bottom */}
            <div className="flex-shrink-0 p-6 bg-white border-t border-gray-200">
              <div className="relative w-full h-[300px]">
                <Image 
                  src="/cover.jpg"
                  alt="Featured Image" 
                  fill
                  className="object-contain rounded"
                  priority
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">No articles yet</p>
          </div>
        )}
      </div>

      {/* Right Section - Featured Image + Article List */}
      <div className="w-1/2 h-full overflow-hidden flex flex-col">
        {/* Featured Image Section */}
        <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
          <div className="relative w-full h-[300px]">
            <Image 
              src="/spiderweb.jpeg"
              alt="Magazine Cover" 
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Articles List - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          <div className="space-y-3">
            {otherArticles.length > 0 ? (
              otherArticles.map((article) => (
                <Link key={article.id} href={`/article/${article.slug}`}>
                  <article className="border-b border-gray-200 pb-3 last:border-b-0 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                    <h3 className="text-sm font-bold text-gray-900 mb-1 leading-tight font-serif hover:text-red-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-red-600 font-semibold mb-1">
                      By {article.author}
                    </p>
                    <p className="text-gray-700 text-xs leading-relaxed mb-1 font-serif italic line-clamp-2">
                      {stripHtml(article.content).substring(0, 80)}...
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
              <div className="text-center py-4">
                <p className="text-gray-600 text-sm">More articles coming soon</p>
              </div>
            )}
          </div>

          {/* Opinion Submission */}
          <div className="mt-4 bg-red-50 p-3 rounded border border-red-200">
            <p className="text-xs text-gray-700 mb-2">Share your NYC perspective</p>
            <button className="bg-red-600 text-white px-3 py-1.5 rounded text-xs hover:bg-red-700 transition-colors font-semibold">
              Submit Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContent