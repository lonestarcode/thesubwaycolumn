import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/types'

interface HeroSectionProps {
  featuredArticle: Article
}

const HeroSection: React.FC<HeroSectionProps> = ({ featuredArticle }) => {
  return (
    <section className="relative h-[600px] bg-gradient-to-br from-purple-900 to-pink-900">
      <div className="absolute inset-0">
        <Image
          src={featuredArticle.featured_image || '/placeholder.jpg'}
          alt={featuredArticle.title}
          fill
          className="object-cover opacity-40"
        />
      </div>
      <div className="relative magazine-container h-full flex items-center">
        <div className="max-w-3xl text-white">
          <span className="inline-block px-4 py-2 bg-purple-600 rounded-full text-sm font-semibold mb-4">
            Featured Story
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {featuredArticle.title}
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            {featuredArticle.content.substring(0, 200)}...
          </p>
          <div className="flex items-center space-x-6">
            <Link
              href={`/article/${featuredArticle.slug}`}
              className="inline-block px-8 py-3 bg-white text-purple-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Read Article
            </Link>
            <div className="flex items-center space-x-3">
              <div>
                <p className="font-semibold">{featuredArticle.author}</p>
                <p className="text-sm text-gray-300">
                  {new Date(featuredArticle.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection