'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import AdSidebar from '@/components/AdSidebar'

const QueensPage = () => {
  const [currentPage, setCurrentPage] = useState(1)

  // Mock data for featured article
  const featuredArticle = {
    title: 'Queens: The World&apos;s Most Diverse Borough Faces Growing Pains',
    author: 'Elena Vasquez',
    date: 'October 13, 2024',
    category: 'Community',
    readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200',
    excerpt: 'Home to immigrants from 120 countries speaking 138 languages, Queens embodies the American dream better than anywhere else. But rapid development and rising costs threaten the very diversity that makes the borough unique.',
    content: `Step off the 7 train at Roosevelt Avenue and you're immediately immersed in a symphony of languages, aromas, and colors that represents the world in miniature. Within a three-block radius, you can find authentic tacos al pastor, hand-pulled Lanzhou noodles, Tibetan momos, and Salvadoran pupusas—often served by immigrants who arrived in Queens with little more than ambition and recipes from home.

This is Queens at its essence: a borough where the American dream isn't just an idea but a daily reality played out in corner bodegas, family restaurants, and bustling commercial strips. With residents from 120 countries speaking 138 different languages, Queens is arguably the most diverse place on Earth.

"Queens is where America happens," says Dr. Ahmed Hassan, a sociologist at Queens College who has studied immigration patterns for two decades. "It's where people come to reinvent themselves while holding onto the best parts of where they came from."

The numbers tell the story: 47% of Queens residents are foreign-born, compared to 37% citywide. In neighborhoods like Elmhurst and Jackson Heights, that figure rises to over 70%. The borough's 2.4 million residents represent every continent and nearly every nation on Earth.

But this extraordinary diversity faces unprecedented challenges. Median home prices in Queens have risen 85% in the past five years, outpacing income growth and pushing longtime residents toward the outer edges of the borough or out entirely. The pandemic hit Queens harder than any other borough, with neighborhoods like Corona and Elmhurst experiencing some of the highest infection and death rates in the nation.

"My family came here in 1995 because Queens was affordable," says Maria Gonzalez, a Jackson Heights resident whose parents opened a small grocery store on Roosevelt Avenue. "Now my kids can't afford to live in the neighborhood where they grew up."

The development pressure is relentless. In Long Island City, luxury towers rise along the waterfront while industrial businesses that provided middle-class jobs are pushed out. In Astoria, craft breweries and artisanal coffee shops cater to young professionals while longtime Greek and Italian businesses struggle with rising rents.

Yet Queens continues to evolve and adapt. The Flushing Meadows Corona Park, built for the 1964 World's Fair, remains a gathering place where cricket matches share space with soccer games and family barbecues. The Queens Museum showcases work by immigrant artists, while the Queens Theatre produces plays in multiple languages.

Food remains the borough's greatest cultural export. The Vendy Awards, celebrating New York's best street food, are dominated by Queens vendors. Food tours of Jackson Heights draw visitors from around the world, while the annual Queens International Night Market has become a must-visit summer destination.

The challenge now is preserving this diversity while allowing for growth. Community land trusts are emerging as one solution, keeping commercial spaces affordable for immigrant businesses. Zoning reforms could protect industrial jobs while allowing for new housing. And community organizations are working to ensure that longtime residents have a voice in shaping their neighborhoods' futures.

"Queens taught me that America isn't a melting pot—it's more like a mosaic," reflects Hassan. "Each piece maintains its distinct character while contributing to something beautiful and unified. The question is whether we can keep that mosaic intact as the city changes around us."

The answer may determine not just the future of Queens, but the future of the American dream itself.`
  }

  // Mock data for recent articles
  const allRecentArticles = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: [
      'Astoria Food Hall Draws Mixed Reviews',
      'Long Island City Luxury Boom Continues',
      'Jackson Heights Small Business Alliance Forms',
      'Flushing Chinatown Adapts to Pandemic Changes',
      'Corona Plaza Renovation Nears Completion',
      'Forest Hills Tennis Stadium Hosts US Open',
      'Elmhurst Hospital Heroes Honored',
      'Woodside Irish Community Celebrates Heritage',
      'Bayside Schools Grapple with Overcrowding',
      'Sunnyside Yards Development Plan Advances',
      'Richmond Hill Indo-Caribbean Festival Returns',
      'Fresh Meadows Housing Lottery Opens',
      'Ridgewood Artists Studios Face Displacement',
      'Jamaica Avenue Business Improvement District',
      'Whitestone Bridge Repairs Cause Traffic Woes',
      'Middle Village Little League Championship',
      'Howard Beach Flooding Solutions Sought',
      'College Point Industrial Zone Changes',
      'Ozone Park Community Garden Thrives',
      'South Richmond Hill Diwali Celebration',
      'Bellerose Train Station Accessibility Upgrades',
      'Little Neck Bay Environmental Cleanup',
      'Douglaston Historic District Preservation',
      'Springfield Gardens Youth Center Reopens',
      'Rosedale Community Board Elections Heat Up'
    ][i % 25],
    date: `October ${15 - Math.floor(i / 2)}, 2024`,
    category: ['Community', 'Development', 'Culture', 'Transportation', 'Education'][i % 5],
    readTime: `${5 + (i % 6)} min read`,
    image: `https://images.unsplash.com/photo-${[
      '1513475382585-d06e58bcb0e0',
      '1578662996442-374dcbcf3dd8',
      '1449824913935-59a10b8d2000',
      '1565299507177-b0ac66763ed1',
      '1534430480742-3c6c410a0cd4'
    ][i % 5]}?w=400`
  }))

  const articlesPerPage = 5
  const totalPages = Math.ceil(allRecentArticles.length / articlesPerPage)
  const currentArticles = allRecentArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Borough Header */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white py-4 px-6 fixed top-16 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto xl:mr-[250px]">
          <h1 className="text-3xl font-bold mb-1">Queens</h1>
          <p className="text-green-100 text-sm">The World&apos;s Borough</p>
        </div>
      </div>

      <div className="fixed inset-0 pt-32 flex">
        
        {/* Main Content Area */}
        <div className="flex-1 xl:mr-[250px] overflow-y-auto px-6 py-4">
          <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Featured Article */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    {featuredArticle.category}
                  </span>
                  <span>{featuredArticle.date}</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                
                <Link
                  href={`/article?borough=queens&title=${encodeURIComponent(featuredArticle.title)}&author=${encodeURIComponent(featuredArticle.author)}&date=${encodeURIComponent(featuredArticle.date)}&category=${encodeURIComponent(featuredArticle.category)}&readTime=${encodeURIComponent(featuredArticle.readTime)}&image=${encodeURIComponent(featuredArticle.image)}&excerpt=${encodeURIComponent(featuredArticle.excerpt)}&content=${encodeURIComponent(featuredArticle.content)}`}
                  className="block"
                >
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 cursor-pointer hover:text-green-700 transition-colors">
                    {featuredArticle.title}
                  </h2>
                </Link>
                
                <p className="text-xl text-gray-700 mb-6 font-medium">
                  {featuredArticle.excerpt}
                </p>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    By <span className="font-semibold text-gray-900">{featuredArticle.author}</span>
                  </p>
                </div>
              </div>
            </article>
          </div>

          {/* Right Sidebar - Recent Articles */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4">
              
              <div className="space-y-3">
                {currentArticles.map((article) => (
                  <article 
                    key={article.id}
                    className="border-b border-gray-200 pb-3 last:border-0 cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors"
                  >
                    <div className="flex gap-3">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="bg-gray-100 px-2 py-0.5 rounded">
                            {article.category}
                          </span>
                          <span>{article.readTime}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {article.date}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
        
        {/* Right Ad Sidebar */}
        <AdSidebar side="right" />
      </div>
    </div>
  )
}

export default QueensPage