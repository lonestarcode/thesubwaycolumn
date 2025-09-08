import { getArticleBySlug } from '@/lib/database';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">Magazine</Link>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              <Link href="/articles" className="text-gray-700 hover:text-gray-900">Articles</Link>
              <Link href="/categories" className="text-gray-700 hover:text-gray-900">Categories</Link>
            </nav>
          </div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <span className="font-medium text-gray-700">{article.author}</span>
            <span>•</span>
            <time>{new Date(article.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</time>
          </div>
        </header>

        {/* Featured Image */}
        {article.featured_image && (
          <div className="relative w-full h-96 md:h-[500px] mb-8">
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Articles
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}