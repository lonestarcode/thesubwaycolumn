import { NextResponse } from 'next/server';
import { getArticleById, updateArticleById, deleteArticleById } from '@/lib/database';
import { revalidatePath } from 'next/cache';

// Rate limiting helper (same as in main route)
declare global {
  var __rt_rate: Map<string, { count: number; ts: number }> | undefined;
}

function bearer(req: Request): string | null {
  const h = req.headers.get('authorization') || '';
  const m = /^Bearer\s+(.+)$/i.exec(h);
  return m ? m[1] : null;
}

function checkAuth(request: Request): boolean {
  const token = bearer(request);
  const expected = process.env.SITE_API_TOKEN || '';
  return Boolean(expected && token === expected);
}

function rateLimitCheck(request: Request): { allowed: boolean; remaining?: number } {
  const ip = request.headers.get('x-forwarded-for') || 'local';
  if (!globalThis.__rt_rate) globalThis.__rt_rate = new Map<string, { count: number; ts: number }>();
  
  const now = Date.now();
  const entry = globalThis.__rt_rate.get(ip) || { count: 0, ts: now };
  
  if (now - entry.ts > 60_000) { 
    entry.count = 0; 
    entry.ts = now; 
  }
  
  entry.count += 1; 
  globalThis.__rt_rate.set(ip, entry);
  
  const limit = 60; // 60 req/min per instance
  return {
    allowed: entry.count <= limit,
    remaining: Math.max(0, limit - entry.count)
  };
}

// GET /api/articles/[id] - Get single article by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = parseInt(id, 10);
    
    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    const article = await getArticleById(articleId);

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: article.id,
      title: article.title,
      content: article.content,
      author: article.author,
      featured_image: article.featured_image,
      created_at: article.created_at,
      slug: article.slug,
      published_url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/article/${article.slug}`
    });
  } catch (error) {
    console.error('Error fetching article by ID:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}

// PUT /api/articles/[id] - Update article by ID
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const rateCheck = rateLimitCheck(request);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' }, 
        { 
          status: 429,
          headers: { 'X-RateLimit-Remaining': rateCheck.remaining?.toString() || '0' }
        }
      );
    }

    // Authentication
    if (!checkAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const articleId = parseInt(id, 10);
    
    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    const body = (await request.json()) as {
      title?: string;
      content_html?: string; // preferred key
      content?: string; // alias accepted from Content Portal
      categories?: string[];
      featured_image?: string | null;
      author?: string;
    } | null;

    // Request size guard
    const approxSize = JSON.stringify(body).length;
    if (approxSize > 1_000_000) { // ~1MB
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    const { title, content_html, content, categories, featured_image, author } = body || {};
    const html = content_html ?? content;

    // Check if article exists
    const existingArticle = await getArticleById(articleId);
    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Update article
    const success = await updateArticleById(
      articleId,
      title,
      html,
      author,
      featured_image,
      categories
    );

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update article' },
        { status: 500 }
      );
    }

    // Revalidate relevant paths
    revalidatePath('/');
    revalidatePath(`/article/${existingArticle.slug}`);

    // Get updated article to return
    const updatedArticle = await getArticleById(articleId);
    
    return NextResponse.json({ 
      article_id: articleId,
      id: articleId, // Both formats for compatibility
      slug: updatedArticle?.slug,
      title: updatedArticle?.title,
      published_url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/article/${updatedArticle?.slug}`,
      message: 'Article updated successfully'
    });
  } catch (error) {
    console.error('❌ Update article error:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

// DELETE /api/articles/[id] - Delete article by ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const rateCheck = rateLimitCheck(request);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' }, 
        { 
          status: 429,
          headers: { 'X-RateLimit-Remaining': rateCheck.remaining?.toString() || '0' }
        }
      );
    }

    // Authentication
    if (!checkAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const articleId = parseInt(id, 10);
    
    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    // Check if article exists before deletion
    const existingArticle = await getArticleById(articleId);
    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Delete the article
    const success = await deleteArticleById(articleId);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete article' },
        { status: 500 }
      );
    }

    // Revalidate relevant paths
    revalidatePath('/');
    revalidatePath(`/article/${existingArticle.slug}`);

    return NextResponse.json({ 
      message: 'Article deleted successfully',
      article_id: articleId,
      id: articleId, // Both formats for compatibility
      deleted_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Delete article error:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}