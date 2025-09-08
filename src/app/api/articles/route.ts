import { NextResponse } from 'next/server';
import { insertArticle, getAllArticles } from '@/lib/database';
import { revalidatePath } from 'next/cache';

// Typed global rate limiter storage
declare global {
  var __rt_rate: Map<string, { count: number; ts: number }> | undefined;
}

function bearer(req: Request): string | null {
  const h = req.headers.get('authorization') || '';
  const m = /^Bearer\s+(.+)$/i.exec(h);
  return m ? m[1] : null;
}

export async function POST(request: Request) {
  try {
    // Basic rate limiting (IP-based, naive per-instance)
    const ip = request.headers.get('x-forwarded-for') || 'local';
    if (!globalThis.__rt_rate) globalThis.__rt_rate = new Map<string, { count: number; ts: number }>();
    const now = Date.now();
    const entry = globalThis.__rt_rate.get(ip) || { count: 0, ts: now };
    if (now - entry.ts > 60_000) { entry.count = 0; entry.ts = now; }
    entry.count += 1; globalThis.__rt_rate.set(ip, entry);
    if (entry.count > 60) { // 60 req/min per instance
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    // Simple auth (replace with proper verification as needed)
    const token = bearer(request);
    const expected = process.env.SITE_API_TOKEN || '';
    if (!expected || token !== expected) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
    if (!title || !html) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert article using the simple blog schema
    const result = await insertArticle(
      title,
      html,
      author || 'ContentPortal',
      featured_image,
      categories
    );

    // Revalidate relevant paths
    revalidatePath('/');
    revalidatePath(`/article/${result.slug}`);

    const published_url = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/article/${result.slug}`;
    return NextResponse.json({ 
      article_id: result.id, 
      slug: result.slug, 
      published_url 
    });
  } catch (error) {
    console.error('❌ Create article error:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const articles = await getAllArticles();
    
    return NextResponse.json({
      articles,
      total: articles.length
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}