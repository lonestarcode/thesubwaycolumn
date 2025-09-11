'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BrooklynPage = () => {
  const [currentPage, setCurrentPage] = useState(1)

  // Mock data for featured article
  const featuredArticle = {
    title: 'Brooklyn&apos;s Waterfront Renaissance: From Industrial Wasteland to Urban Paradise',
    author: 'Marcus Rodriguez',
    date: 'October 14, 2024',
    category: 'Development',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200',
    excerpt: 'Once dominated by shipping containers and abandoned warehouses, Brooklyn&apos;s waterfront has transformed into one of New York&apos;s most coveted destinations. From DUMBO to Red Hook, billions in investment are reshaping the borough&apos;s relationship with the water.',
    content: `The East River laps gently against the Brooklyn Bridge Park pier as joggers weave between families pushing strollers and couples taking selfies with the Manhattan skyline. It's a scene that would have been impossible to imagine just two decades ago, when this stretch of waterfront was lined with crumbling piers and abandoned shipping terminals.

Brooklyn's waterfront renaissance represents one of the most dramatic urban transformations in modern American history. What began with the conversion of the old Fulton Ferry Landing has now stretched along nearly 14 miles of coastline, from Greenpoint to Bay Ridge, creating a continuous ribbon of parks, luxury condos, and cultural destinations.

"The waterfront has become Brooklyn's front door to the world," says Lisa Chen, a urban planning professor at Pratt Institute who has studied the transformation. "But it's also become a symbol of the tensions between preservation and development, between public access and private profit."

The numbers are staggering: over $15 billion in private investment, 85 acres of new parkland, and more than 30,000 new residential units. The Brooklyn Bridge Park alone attracts 5 million visitors annually, rivaling Central Park's northern section for foot traffic.

Yet the transformation hasn't been without controversy. In Red Hook, longtime residents worry about displacement as median home prices have tripled in five years. The planned expansion of the Brooklyn Bridge Park has faced criticism from affordable housing advocates who argue that luxury towers are overshadowing the original vision of public space.

"We're not against development," says Maria Santos, president of the Red Hook Civic Association. "We just want to make sure that the people who made this neighborhood special can still afford to live here."

The success stories are undeniable. The abandoned Domino Sugar Factory in Williamsburg has been transformed into a mixed-use complex that preserves the iconic refinery while adding 2,800 apartments, half designated as affordable housing. The project includes 6 acres of waterfront parkland and has sparked a renaissance in the surrounding neighborhood.

Further south, Industry City in Sunset Park has become a model for adaptive reuse. The former shipping and manufacturing complex now houses over 550 businesses, from tech startups to artisanal food producers, employing more than 8,000 people.

But perhaps the most ambitious project is still to come. The proposed Brooklyn Waterfront Greenway would connect all of the borough's waterfront neighborhoods with a continuous bike and pedestrian path. If completed, it would create the longest waterfront greenway in the United States.

As Brooklyn continues to evolve, its waterfront serves as both an example and a warning. Done right, waterfront development can create jobs, housing, and public amenities while preserving neighborhood character. Done wrong, it can price out longtime residents and create sterile enclaves for the wealthy.

The next chapter of Brooklyn's waterfront story is being written now, and the stakes have never been higher.`
  }

  // Mock data for recent articles
  const allRecentArticles = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: [
      'Williamsburg&apos;s New Bagel Wars Heat Up',
      'Park Slope Parents Battle Over Playground Rules',
      'Crown Heights Gentrification Reaches Tipping Point',
      'DUMBO Office Market Shows Signs of Recovery',
      'Bushwick Artists Face Rising Studio Rents',
      'Bay Ridge Restaurants Struggle with Staffing',
      'Prospect Heights Bike Lane Sparks Controversy',
      'Cobble Hill Historic District Expansion Proposed',
      'Greenpoint Waterfront Cleanup Begins',
      'Fort Greene Jazz Scene Makes a Comeback',
      'Carroll Gardens Real Estate Prices Soar',
      'Bed-Stuy Community Garden Faces Eviction',
      'Brooklyn Heights Promenade Repairs Complete',
      'Flatbush Avenue Redesign Moves Forward',
      'Gowanus Superfund Site Remediation Update',
      'Red Hook Food Vendors Fight New Regulations',
      'Coney Island Boardwalk Summer Season Recap',
      'Canarsie Pier Renovation Project Announced',
      'Sunset Park Chinatown Celebrates Heritage',
      'Bensonhurst Small Business Recovery Program',
      'Mill Basin Flooding Solutions Under Review',
      'Sheepshead Bay Fishing Industry Adapts',
      'Brighton Beach Cultural Center Reopens',
      'Marine Park Development Plans Unveiled',
      'Gravesend Community Center Expansion'
    ][i % 25],
    date: `October ${15 - Math.floor(i / 2)}, 2024`,
    category: ['Community', 'Development', 'Culture', 'Business', 'Politics'][i % 5],
    readTime: `${4 + (i % 7)} min read`,
    image: `https://images.unsplash.com/photo-${[
      '1559827260-1668c3df4d15',
      '1518235506717-e1ed3306a89b',
      '1590254211946-90b1b5b71288',
      '1544366503-4e434a4e3d3c',
      '1512436991910-c2d7b36c4b82'
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
      <div className="bg-gradient-to-r from-red-900 to-red-700 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Brooklyn</h1>
          <p className="text-red-100">The Borough of Churches, Culture & Community</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Featured Article */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-96">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                    {featuredArticle.category}
                  </span>
                  <span>{featuredArticle.date}</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                
                <Link
                  href={`/article?borough=brooklyn&title=${encodeURIComponent(featuredArticle.title)}&author=${encodeURIComponent(featuredArticle.author)}&date=${encodeURIComponent(featuredArticle.date)}&category=${encodeURIComponent(featuredArticle.category)}&readTime=${encodeURIComponent(featuredArticle.readTime)}&image=${encodeURIComponent(featuredArticle.image)}&excerpt=${encodeURIComponent(featuredArticle.excerpt)}&content=${encodeURIComponent(featuredArticle.content)}`}
                  className="block"
                >
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 cursor-pointer hover:text-red-700 transition-colors">
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
            <div className="bg-white rounded-lg shadow-lg p-6">
              
              <div className="space-y-4">
                {currentArticles.map((article) => (
                  <article 
                    key={article.id}
                    className="border-b border-gray-200 pb-4 last:border-0 cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors"
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
              <div className="mt-6 pt-6 border-t border-gray-200">
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
  )
}

export default BrooklynPage