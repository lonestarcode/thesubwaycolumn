import { NextResponse } from 'next/server';

// Typed global rate limiter storage
declare global {
  var __rt_rate: Map<string, { count: number; ts: number }> | undefined;
}

function bearer(req: Request): string | null {
  const h = req.headers.get('authorization') || '';
  const m = /^Bearer\s+(.+)$/i.exec(h);
  return m ? m[1] : null;
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

export async function GET(request: Request) {
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

    // Simple auth (replace with proper verification as needed)
    const token = bearer(request);
    const expected = process.env.SITE_API_TOKEN || '';
    if (!expected || token !== expected) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For now, return a simple set of default categories
    // This matches what most blog systems expect
    const categories = [
      { slug: 'general', name: 'General' },
      { slug: 'news', name: 'News' },
      { slug: 'opinion', name: 'Opinion' },
      { slug: 'culture', name: 'Culture' },
      { slug: 'lifestyle', name: 'Lifestyle' },
      { slug: 'technology', name: 'Technology' }
    ];

    return NextResponse.json({
      categories,
      total: categories.length
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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

    // Simple auth (replace with proper verification as needed)
    const token = bearer(request);
    const expected = process.env.SITE_API_TOKEN || '';
    if (!expected || token !== expected) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as {
      name?: string;
      slug?: string;
    } | null;

    const { name, slug } = body || {};
    
    if (!name || !slug) {
      return NextResponse.json({ error: 'Missing required fields: name and slug' }, { status: 400 });
    }

    // For now, just return success - in a real implementation you'd save to database
    console.log(`Would create category: ${name} (${slug})`);
    
    return NextResponse.json({ 
      slug,
      name,
      message: 'Category created successfully'
    });
  } catch (error) {
    console.error('❌ Create category error:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}