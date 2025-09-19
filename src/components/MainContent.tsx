'use client'

import Link from 'next/link'
import { Article } from '@/types'

const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
}

const MainContent = ({ articles = [] }: { articles?: Article[] }) => {
  const mostRecentArticle = articles[0]
  // Show fewer articles on the homepage so everything fits without scrolling.
  // Limit to 3 previews (1 main + 2 secondary) and shorten excerpts.
  const otherArticles = articles.slice(1, 3)

  // For now, show recent articles in sports section (would filter by category if available)
  const sportsArticles = articles.slice(3, 7)

  return (
    <div className="w-full h-full bg-gray-50 overflow-hidden p-4">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] md:gap-6 h-full">
        {/* Main column - Featured article + Recent articles below */}
        <div className="w-full flex flex-col overflow-hidden space-y-4">
          {mostRecentArticle ? (
            <>
              {/* Featured Article */}
              <div className="p-3 md:p-4 bg-white">
                <Link href={`/article/${mostRecentArticle.slug}`}>
                  <article className="cursor-pointer">
                    <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight font-serif hover:text-red-600 transition-colors">
                      {mostRecentArticle.title}
                    </h1>
                    <p className="text-xs text-red-600 font-semibold mb-2">
                      By {mostRecentArticle.author}
                    </p>
                    <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-3 font-serif italic overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
                      {stripHtml(mostRecentArticle.content).substring(0, 150)}
                    </p>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {new Date(mostRecentArticle.created_at).toLocaleDateString()}
                      </span>
                      <span className="text-red-600 text-sm font-semibold hover:underline">
                        Continue Reading
                      </span>
                    </div>
                  </article>
                </Link>
              </div>

              {/* Recent Articles below featured */}
              <div className="p-3 md:p-4 bg-white flex-1 overflow-hidden">
                <h2 className="text-sm tracking-wider uppercase text-gray-500 font-semibold mb-3">Recent Articles</h2>
                <div className="space-y-2">
                  {otherArticles.length > 0 ? (
                    otherArticles.map((article) => (
                      <Link key={article.id} href={`/article/${article.slug}`}>
                        <article className="border-b border-gray-200 pb-3 last:border-b-0 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                          <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1 leading-tight font-serif hover:text-red-600 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-xs text-red-600 font-semibold mb-1">
                            By {article.author}
                          </p>
                          <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-1 font-serif italic overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
                            {stripHtml(article.content).substring(0, 90)}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 uppercase tracking-wide">
                              {new Date(article.created_at).toLocaleDateString()}
                            </span>
                            <span className="text-red-600 text-xs font-semibold">
                              Read
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
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-48 bg-white">
              <p className="text-gray-600">No articles yet</p>
            </div>
          )}
        </div>

        {/* Right column - Sports articles */}
        <div className="w-full flex flex-col h-full overflow-hidden">
          <div className="p-3 md:p-4 bg-white h-full overflow-hidden">
            <h2 className="text-sm tracking-wider uppercase text-gray-500 font-semibold mb-3">Sports</h2>
            <div className="space-y-2">
              {sportsArticles.length > 0 ? (
                sportsArticles.map((article) => (
                  <Link key={article.id} href={`/article/${article.slug}`}>
                    <article className="border-b border-gray-200 pb-2 last:border-b-0 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                      <h3 className="text-sm font-bold text-gray-900 mb-1 leading-tight font-serif hover:text-red-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {new Date(article.created_at).toLocaleDateString()}
                      </p>
                    </article>
                  </Link>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600 text-sm">No sports articles yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContent