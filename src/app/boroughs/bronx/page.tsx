'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BronxPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [showFullArticle, setShowFullArticle] = useState(false)

  // Mock data for featured article
  const featuredArticle = {
    title: 'The Bronx Rising: From \'Burning\' Borough to Cultural Powerhouse',
    author: 'Carlos Montenegro',
    date: 'October 12, 2024',
    category: 'Culture',
    readTime: '13 min read',
    image: 'https://images.unsplash.com/photo-1441980797913-62f86d41afcd?w=1200',
    excerpt: 'Once synonymous with urban decay, the Bronx has transformed into a vibrant center of Latino culture, hip-hop innovation, and community resilience. A new generation of artists, entrepreneurs, and activists is rewriting the borough\'s narrative.',
    content: `The murals tell the story better than any statistics. On the walls of apartment buildings in the South Bronx, vibrant scenes of Taíno warriors dance alongside portraits of Celia Cruz and Big Pun. Children play beneath a towering mural of Alexandria Ocasio-Cortez, while elderly dominoes players gather in the shadows of artwork celebrating the birth of hip-hop.

This is the Bronx of 2024: a borough that has not only survived one of the most dramatic urban collapses in American history but has emerged as a global cultural force. From the ashes of the 1970s—when "The Bronx is burning" became a national catchphrase—has risen a community that embodies resilience, creativity, and hope.

"People see us differently now," says Isabella Rodriguez, a lifelong Hunts Point resident who runs a community arts program. "We\'re not the Bronx of the news headlines anymore. We\'re the Bronx of Cardi B, of the Yankees, of amazing food and music and art. We\'re proud of what we\'ve built."

The transformation is visible everywhere. The South Bronx, once America\'s symbol of urban blight, now houses the new Yankee Stadium, a thriving waterfront district, and some of the city\'s most innovative affordable housing developments. In Mott Haven, artist studios occupy former warehouses while new galleries showcase work by local painters, photographers, and sculptors.

The Hub, the commercial heart of the South Bronx, buzzes with activity as shoppers browse everything from traditional Latino groceries to trendy boutiques. The nearby Bronx Museum of the Arts has become a destination for visitors from around the world, while the restored Concourse Plaza Multiplex brings first-run movies back to the Grand Concourse.

But perhaps the most dramatic change is demographic. The Bronx is now 56% Latino, making it one of the most Hispanic counties in the United States. This has brought an explosion of Dominican, Puerto Rican, and Mexican businesses, restaurants, and cultural institutions. The annual Bronx Week celebration draws hundreds of thousands of visitors for concerts, food festivals, and art shows.

"We\'ve always been a borough of immigrants," explains Dr. Maria Santos, a historian at Bronx Community College. "But now there\'s a new confidence, a new pride in being Bronxeño. Young people aren\'t running away to Manhattan anymore. They\'re staying and building something special here."

The economic numbers support this optimism. Unemployment in the Bronx has fallen to its lowest level in decades, while new businesses are opening at a rate not seen since the 1950s. The borough\'s food scene has exploded, with everything from high-end restaurants to innovative food trucks serving cuisines from across Latin America and the Caribbean.

Music remains the borough\'s greatest cultural export. Hip-hop, born in the Bronx five decades ago, continues to evolve in neighborhood studios and community centers. Salsa, merengue, and reggaeton flow from windows and car stereos, creating a constant soundtrack for daily life. The Universal Hip-Hop Museum, set to open fully next year, will cement the borough\'s status as the birthplace of one of the world\'s most influential musical movements.

Yet challenges remain. Gentrification pressures are mounting as Manhattan rents push middle-class residents north. The borough still faces higher rates of asthma and diabetes than the rest of the city, legacy issues from decades of environmental neglect. And while crime has dropped dramatically, some neighborhoods still struggle with violence and drug-related issues.

Community leaders are working to ensure that the borough\'s renaissance benefits longtime residents. Community land trusts are preserving affordable housing, while local hiring requirements ensure that new developments create jobs for Bronx residents. Youth programs channel creative energy into positive outlets, while community gardens and urban farms provide fresh food in neighborhoods long classified as food deserts.

"The Bronx taught America about hip-hop," reflects Rodriguez. "Now we\'re teaching America about community resilience, about how to come back stronger. We\'ve been counted out before, and we proved everyone wrong. We\'re not done surprising people yet."

As the sun sets over the Bronx River, casting golden light on the borough\'s mixture of historic architecture and modern development, it\'s clear that the story of the Bronx is still being written. And for the first time in generations, it\'s a story of hope.`
  }

  // Mock data for recent articles
  const allRecentArticles = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: [
      'Yankee Stadium Area Businesses See Growth Surge',
      'South Bronx Artists Collective Opens New Gallery',
      'Hunts Point Market Modernization Continues',
      'Morris Heights Community Garden Expansion',
      'Concourse Plaza Housing Development Breaks Ground',
      'Bronx Zoo\'s New Conservation Center Opens',
      'Hip-Hop Museum Prepares for Full Opening',
      'Fordham Road Shopping District Revitalization',
      'Castle Hill Community Center Renovation Complete',
      'High Bridge Park Restoration Project Update',
      'Soundview Waterfront Development Planned',
      'East Tremont Business Improvement District',
      'Bronx River Greenway Extension Approved',
      'Melrose Affordable Housing Lottery Opens',
      'University Heights Food Co-op Celebrates Anniversary',
      'Parkchester Subway Station Accessibility Upgrades',
      'West Farms Community Health Initiative',
      'Morrisania Cultural Arts Festival Returns',
      'Longwood Art District Gains Recognition',
      'Belmont Little Italy Heritage Tour Launch',
      'Riverdale Private School Expansion Controversy',
      'Throggs Neck Bridge Repairs Begin',
      'Wakefield Community Library Reopens',
      'City Island Restaurant Week Success',
      'Co-op City Residents Fight Rent Increases'
    ][i % 25],
    date: `October ${15 - Math.floor(i / 2)}, 2024`,
    category: ['Community', 'Culture', 'Development', 'Business', 'Politics'][i % 5],
    readTime: `${4 + (i % 8)} min read`,
    image: `https://images.unsplash.com/photo-${[
      '1441980797913-62f86d41afcd',
      '1518391846015-55a9cc003b25',
      '1578662996442-374dcbcf3dd8',
      '1565299624946-b28f40a0ae38',
      '1544366503-4e434a4e3d3c'
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
      <div className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">The Bronx</h1>
          <p className="text-purple-100">Borough of Hip-Hop, Culture & Community Pride</p>
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
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    FEATURED
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    {featuredArticle.category}
                  </span>
                  <span>{featuredArticle.date}</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  {featuredArticle.title}
                </h2>
                
                <p className="text-xl text-gray-700 mb-6 font-medium">
                  {featuredArticle.excerpt}
                </p>
                
                {showFullArticle ? (
                  <div className="prose max-w-none text-gray-700">
                    {featuredArticle.content.split('\n\n').map((paragraph, idx) => (
                      <p key={`paragraph-${idx}`} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                    <button
                      onClick={() => setShowFullArticle(false)}
                      className="mt-4 text-purple-600 hover:text-purple-800 font-medium"
                    >
                      Show Less
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowFullArticle(true)}
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Read Full Article →
                  </button>
                )}
                
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
              <h3 className="text-xl font-bold mb-6 text-gray-900 border-b pb-3">
                Recent Bronx Stories
              </h3>
              
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

export default BronxPage