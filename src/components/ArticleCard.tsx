import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/types'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'horizontal' | 'featured'
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'default' }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  if (variant === 'horizontal') {
    return (
      <article className="article-card flex flex-col md:flex-row">
        <div className="md:w-1/3 relative h-48 md:h-auto">
          <Image
            src={article.featured_image || '/placeholder.jpg'}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-sm text-gray-500">{formatDate(article.created_at)}</span>
          </div>
          <Link href={`/article/${article.slug}`}>
            <h3 className="text-xl font-bold mb-2 hover:text-purple-600 transition-colors">
              {article.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-4 line-clamp-2">{article.content.substring(0, 150)}...</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{article.author}</span>
          </div>
        </div>
      </article>
    )
  }

  if (variant === 'featured') {
    return (
      <article className="relative h-[500px] rounded-lg overflow-hidden group">
        <Image
          src={article.featured_image || '/placeholder.jpg'}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <Link href={`/article/${article.slug}`}>
            <h2 className="text-3xl font-bold mb-3 hover:text-purple-400 transition-colors">
              {article.title}
            </h2>
          </Link>
          <p className="text-gray-200 mb-4 line-clamp-2">{article.content.substring(0, 150)}...</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{article.author}</p>
              <p className="text-sm text-gray-300">{formatDate(article.created_at)}</p>
            </div>
          </div>
        </div>
      </article>
    )
  }

  // Default variant
  return (
    <article className="article-card">
      <Link href={`/article/${article.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={article.featured_image || '/placeholder.jpg'}
            alt={article.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-sm text-gray-500">{formatDate(article.created_at)}</span>
        </div>
        <Link href={`/article/${article.slug}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-purple-600 transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.content.substring(0, 150)}...</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{article.author}</span>
        </div>
      </div>
    </article>
  )
}

export default ArticleCard