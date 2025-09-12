'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import AdSidebar from '@/components/AdSidebar'

const ManhattanPage = () => {
  const [currentPage, setCurrentPage] = useState(1)

  // Mock data for featured article
  const featuredArticle = {
    title: 'The Great Manhattan Office Exodus: What&apos;s Next for Midtown?',
    author: 'Sarah Chen',
    date: 'October 15, 2024',
    category: 'Real Estate',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1470219556762-1771e7f9427d?w=1200',
    excerpt: 'As remote work reshapes the city&apos;s commercial landscape, Manhattan&apos;s iconic office towers face an uncertain future. From Midtown to FiDi, vacancy rates tell a story of transformation that could redefine New York&apos;s business districts for generations to come.',
    content: `The skyline hasn't changed, but everything else has. Walk through Midtown on a Tuesday afternoon, and you'll notice something different from three years ago—fewer suits, more empty storefronts, and a palpable sense of transition hanging in the air like morning fog over the Hudson.

Commercial real estate brokers, once the city's most confident dealmakers, now speak in cautious tones about "repositioning" and "adaptive reuse." The numbers tell the story: Manhattan's office vacancy rate has climbed to 22.5%, nearly triple pre-pandemic levels. In Midtown alone, there's enough empty office space to fill the Empire State Building 16 times over.

"We're not just talking about a market correction," says David Martinez, a veteran broker with 25 years in Manhattan commercial real estate. "This is a fundamental reimagining of how we use urban space."

The transformation isn't uniform. While older Class B and C buildings struggle to attract tenants at any price, newer properties with modern amenities and flexible floor plans are seeing renewed interest. The Hudson Yards development, despite early skepticism, has maintained relatively strong occupancy rates, suggesting that quality and location still matter—perhaps more than ever.

Downtown, the Financial District tells a different story. Long considered a Monday-to-Friday ghost town, FiDi has paradoxically benefited from the office exodus. As commercial rents plummet, creative conversions are bringing new life to century-old buildings. The landmark 25 Park Row, once home to the city's newspaper industry, will soon house 1,200 residential units.

But conversion isn't simple or cheap. "People think you can just throw up some drywall and call it an apartment," laughs architect Jennifer Wu, who's overseen three major office-to-residential conversions. "These buildings were designed for massive floor plates and minimal plumbing. Every conversion is essentially a gut renovation."

The city has taken notice. Mayor Adams' recent "New New York" plan includes expedited approvals for office conversions and tax incentives for developers willing to include affordable housing. Still, critics argue the measures don't go far enough. "We need bold action, not incremental changes," says housing advocate Maria Rodriguez. "This crisis is also an opportunity to address our housing shortage."

For now, Manhattan's office buildings stand at a crossroads. Some will adapt and thrive in new forms. Others may face demolition. But one thing is certain: the Manhattan of 2030 will look very different from the Manhattan we knew before March 2020.`
  }

  // Mock data for recent articles (25 total for pagination demo)
  const allRecentArticles = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: [
      'SoHo Landlords Fight Back Against Street Vendors',
      'East Harlem Rent Strike Enters Third Week',
      'Upper West Side Parents Battle Over School Rezoning',
      'Chelsea Market Expansion Plans Draw Opposition',
      'Washington Heights Small Businesses Face Displacement',
      'Times Square&apos;s Slow Return to Pre-Pandemic Crowds',
      'Lower East Side Gallery Scene Rebounds Strong',
      'Harlem Jazz Clubs Navigate Rising Rents',
      'Tribeca Film Festival Announces Permanent Venue',
      'Murray Hill Residents Sue Over Noise Complaints',
      'Hell&apos;s Kitchen Development Boom Continues',
      'Upper East Side Co-op Board Drama Intensifies',
      'Greenwich Village Historic District Under Threat',
      'Chinatown Fights to Preserve Cultural Identity',
      'Midtown Food Trucks Stage Protest Over Regulations',
      'Financial District&apos;s Residential Conversion Accelerates',
      'Central Park Conservancy Unveils New Master Plan',
      'Columbus Circle Redesign Sparks Debate',
      'Inwood Affordable Housing Project Breaks Ground',
      'Battery Park City Flood Protection Measures',
      'NoHo Boutique Hotels Face Staffing Crisis',
      'Flatiron District Tech Hub Plans Revealed',
      'Morningside Heights Campus Expansion Controversy',
      'Two Bridges Mega-Towers Near Completion',
      'Stuyvesant Town Tenant Organization Wins Victory'
    ][i % 25],
    date: `October ${15 - Math.floor(i / 2)}, 2024`,
    category: ['Politics', 'Real Estate', 'Culture', 'Business', 'Community'][i % 5],
    readTime: `${5 + (i % 8)} min read`,
    image: `https://images.unsplash.com/photo-${[
      '1518235506717-e1ed3306a89b',
      '1499092985439-977c61229e32',
      '1523374228107-6e44bd2b524e',
      '1590254211946-90b1b5b71288',
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
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-4 px-6 fixed top-16 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto xl:ml-[250px] xl:mr-[250px]">
          <h1 className="text-3xl font-bold mb-1">Manhattan</h1>
          <p className="text-blue-100 text-sm">The Heart of New York City</p>
        </div>
      </div>

      <div className="fixed inset-0 pt-32 flex">
        {/* Left Ad Sidebar */}
        <AdSidebar side="left" />

        {/* Main Content Area */}
        <div className="flex-1 xl:ml-[250px] xl:mr-[250px] overflow-y-auto px-6 py-4">
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
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {featuredArticle.category}
                  </span>
                  <span>{featuredArticle.date}</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                
                <Link
                  href={`/article?borough=manhattan&title=${encodeURIComponent(featuredArticle.title)}&author=${encodeURIComponent(featuredArticle.author)}&date=${encodeURIComponent(featuredArticle.date)}&category=${encodeURIComponent(featuredArticle.category)}&readTime=${encodeURIComponent(featuredArticle.readTime)}&image=${encodeURIComponent(featuredArticle.image)}&excerpt=${encodeURIComponent(featuredArticle.excerpt)}&content=${encodeURIComponent(featuredArticle.content)}`}
                  className="block"
                >
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 cursor-pointer hover:text-blue-700 transition-colors">
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

export default ManhattanPage