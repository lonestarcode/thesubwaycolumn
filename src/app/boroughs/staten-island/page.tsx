'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
// Ad column removed

const StatenIslandPage = () => {
  const [currentPage, setCurrentPage] = useState(1)

  // Mock data for featured article
  const featuredArticle = {
    title: 'Staten Island&apos;s Identity Crisis: Suburban Dreams vs. Urban Reality',
    author: 'Jennifer Sullivan',
    date: 'October 11, 2024',
    category: 'Politics',
    readTime: '14 min read',
    image: 'https://images.unsplash.com/photo-1585558265020-1dc5db043da0?w=1200',
    excerpt: 'Often called the "forgotten borough," Staten Island grapples with its place in New York City. As development pressures mount and political tensions rise, residents debate whether they&apos;re more New York or New Jersey—and what that means for their future.',
    content: `From the deck of the Staten Island Ferry, the borough appears deceptively pastoral—rolling hills dotted with single-family homes, ribbons of green parkland, and a skyline notably absent of towering skyscrapers. It's a view that reinforces Staten Island's reputation as New York City's suburban outpost, the place where city workers go to escape urban intensity without leaving the five boroughs entirely.

But step off the ferry at St. George Terminal and you're immediately confronted with the complexities that define Staten Island's unique position in the urban ecosystem. To the left, gleaming condos rise along the waterfront, part of a billion-dollar development boom. To the right, aging strip malls and empty lots speak to decades of disinvestment and neglect.

"People think they know Staten Island, but they don't," says Michael Cusick, who has represented parts of the borough in the state assembly for over two decades. "They see the stereotypes—the suburban refuge, the conservative enclave, the place that wanted to secede. But we're more complicated than that."

Indeed, Staten Island defies easy categorization. With 495,000 residents spread across 58 square miles, it's simultaneously the most and least New York of all the boroughs. It has more single-family homes than any other borough, yet also some of the city's most pressing environmental challenges. It votes Republican in local elections but sends Democrats to Albany. It complains about city services while benefiting from city resources.

The island's political identity has been shaped by a persistent sense of neglect. Despite being home to nearly half a million New Yorkers, Staten Island often feels like an afterthought in city planning. The borough has just one subway line (technically the SIR railroad), limited express bus service, and a transportation infrastructure that forces most residents to rely on cars.

"We pay New York City taxes but get New Jersey services," jokes Maria Gonzalez, a New Springville resident who commutes to Manhattan daily. "Sometimes I think we'd be better off if we actually were part of New Jersey."

This sentiment isn't entirely hyperbolic. Geographic and economic ties to New Jersey are strong—many Staten Islanders work across the Goethals or Verrazzano bridges, shop at New Jersey malls, and root for New Jersey sports teams. The borough's media market is dominated by New Jersey outlets, and cell phone area codes reflect the island's cross-river connections.

Yet Staten Island is undeniably changing. The population has grown by 15% since 2000, driven largely by newcomers priced out of other boroughs. Developers are targeting the island's remaining open spaces, proposing everything from luxury condos to warehouse complexes. The transformation is most visible along the North Shore, where the St. George waterfront has been reimagined as a mixed-use district with shopping, dining, and entertainment.

Environmental concerns add another layer of complexity. Staten Island is home to the Fresh Kills Landfill, once the world's largest garbage dump and now being transformed into a massive park. Climate change poses particular threats to an island surrounded by water—Hurricane Sandy devastated entire neighborhoods, and flooding remains a constant concern in low-lying areas.

"We're ground zero for so many of the city's environmental challenges," explains Dr. Sarah Chen, an environmental science professor at the College of Staten Island. "But we're also where some of the most innovative solutions are being tested. Fresh Kills isn't just becoming a park—it's becoming a laboratory for sustainable development."

The borough's cultural identity is equally complex. Staten Island has produced everyone from mob bosses to reality TV stars to Supreme Court justices. It's home to thriving Italian-American and growing Hispanic communities, but also significant populations of South Asians, Eastern Europeans, and African immigrants. The St. George Theatre hosts Broadway-quality productions, while the Snug Harbor Cultural Center preserves maritime history alongside contemporary art.

Local politics reflect these contradictions. While Staten Island often votes Republican in local races, its representatives must navigate a Democratic city government. Issues that might be handled by county or state governments elsewhere—like transportation, housing, and environmental protection—fall under city jurisdiction, creating unique political dynamics.

Economic development remains a persistent challenge. The borough lacks the dense commercial districts that define other boroughs, instead relying on scattered shopping centers and strip malls. Efforts to create a downtown district around St. George have shown promise, but progress has been slow. The proposed New York Wheel—a giant Ferris wheel that was supposed to anchor waterfront development—became a symbol of the borough's development struggles when it was cancelled after years of delays.

"Staten Island is at a crossroads," reflects longtime resident and community advocate Frank Donnelly. "We can either embrace our role as part of New York City and work to make that relationship better, or we can keep complaining about being forgotten while doing nothing to change our situation."

As ferry commuters head home each evening, crossing the harbor with Manhattan's glittering skyline behind them, they carry with them the daily reminder of Staten Island's unique position. They live in New York City, but in a place unlike anywhere else in the five boroughs. Whether that's Staten Island's greatest asset or its biggest challenge depends on who you ask—and when you ask them.`
  }

  // Mock data for recent articles
  const allRecentArticles = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: [
      'St. George Terminal Gets $40M Facelift',
      'Great Kills Park Beach Restoration Complete',
      'Staten Island Mall Expansion Plans Unveiled',
      'Fresh Kills Park Phase 2 Opens to Public',
      'New Brighton Community Theater Revival',
      'Stapleton Waterfront Development Approved',
      'Richmond Town Historic Village Expansion',
      'West Brighton Housing Lottery Draws Crowds',
      'Tottenville Shore Cleanup Volunteer Drive',
      'Eltingville Transit Center Upgrades Begin',
      'Oakwood Beach Buyout Program Update',
      'Port Richmond Gentrification Concerns Rise',
      'Annadale Shopping Center Redevelopment',
      'Clove Lakes Park Improvements Completed',
      'Great Kills Marina Expansion Proposal',
      'Huguenot Beach Erosion Control Measures',
      'Rossville AME Church Historic Designation',
      'Pleasant Plains Elementary School Renovation',
      'New Dorp Lane Business Improvement Push',
      'Princes Bay Oyster Restoration Project',
      'Woodrow Road Widening Project Begins',
      'South Beach Boardwalk Repairs Complete',
      'Richmond Valley Development Controversy',
      'Travis Community Center Programming Expands',
      'Charleston Fresh Kills Buffer Zone Debate'
    ][i % 25],
    date: `October ${15 - Math.floor(i / 2)}, 2024`,
    category: ['Development', 'Environment', 'Community', 'Transportation', 'Politics'][i % 5],
    readTime: `${6 + (i % 7)} min read`,
    image: `https://images.unsplash.com/photo-${[
      '1585558265020-1dc5db043da0',
      '1518391846015-55a9cc003b25',
      '1449824913935-59a10b8d2000',
      '1582407947550-bb24c88df69b',
      '1554072675-66db59dba46f'
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
      <div className="bg-gradient-to-r from-orange-900 to-orange-700 text-white py-4 px-6 fixed top-16 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto xl:mr-[250px]">
          <h1 className="text-3xl font-bold mb-1">Staten Island</h1>
          <p className="text-orange-100 text-sm">The Borough of Parks & Small-Town Charm</p>
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
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                    {featuredArticle.category}
                  </span>
                  <span>{featuredArticle.date}</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                
                <Link
                  href={`/article?borough=staten-island&title=${encodeURIComponent(featuredArticle.title)}&author=${encodeURIComponent(featuredArticle.author)}&date=${encodeURIComponent(featuredArticle.date)}&category=${encodeURIComponent(featuredArticle.category)}&readTime=${encodeURIComponent(featuredArticle.readTime)}&image=${encodeURIComponent(featuredArticle.image)}&excerpt=${encodeURIComponent(featuredArticle.excerpt)}&content=${encodeURIComponent(featuredArticle.content)}`}
                  className="block"
                >
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 cursor-pointer hover:text-orange-700 transition-colors">
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
  {/* Right Ad Sidebar removed */}
      </div>
    </div>
  )
}

export default StatenIslandPage