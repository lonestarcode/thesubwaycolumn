'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

function ArticleContent() {
  const searchParams = useSearchParams()
  const borough = searchParams.get('borough')
  const title = searchParams.get('title')
  const author = searchParams.get('author')
  const date = searchParams.get('date')
  const category = searchParams.get('category')
  const readTime = searchParams.get('readTime')
  const image = searchParams.get('image')
  const excerpt = searchParams.get('excerpt')
  const content = searchParams.get('content')

  const getBoroughColor = (borough: string | null) => {
    switch(borough) {
      case 'manhattan': return 'blue'
      case 'brooklyn': return 'red'
      case 'queens': return 'green'
      case 'bronx': return 'purple'
      case 'staten-island': return 'orange'
      default: return 'gray'
    }
  }

  const color = getBoroughColor(borough)

  if (!title) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Return to homepage
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            href={borough ? `/boroughs/${borough}` : '/'}
            className={`inline-flex items-center gap-2 text-${color}-600 hover:text-${color}-800 font-medium`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {borough ? borough.charAt(0).toUpperCase() + borough.slice(1).replace('-', ' ') : 'Home'}
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {image && (
            <div className="relative h-96 lg:h-[500px]">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="p-8 lg:p-12">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              {category && (
                <span className={`bg-${color}-100 text-${color}-800 px-3 py-1 rounded`}>
                  {category}
                </span>
              )}
              {date && <span>{date}</span>}
              {readTime && <span>{readTime}</span>}
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              {title}
            </h1>
            
            {excerpt && (
              <p className="text-xl text-gray-700 mb-8 font-medium leading-relaxed">
                {excerpt}
              </p>
            )}
            
            {content && (
              <div className="prose prose-lg max-w-none text-gray-700">
                {content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
            
            {author && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  By <span className="font-semibold text-gray-900">{author}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export default function ArticlePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    }>
      <ArticleContent />
    </Suspense>
  )
}