import Link from 'next/link'
import ArticleCard from './ArticleCard'
import { Article } from '@/types'

interface CategorySectionProps {
  title: string
  articles: Article[]
  viewAllLink: string
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  title, 
  articles, 
  viewAllLink 
}) => {
  if (articles.length === 0) return null

  return (
    <section className="bg-gray-50 py-12">
      <div className="magazine-container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Link 
            href={viewAllLink}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.slice(0, 4).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection