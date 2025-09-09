import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/database';

// Typed global rate limiter storage
declare global {
  var __rt_rate: Map<string, { count: number; ts: number }> | undefined;
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

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const offset = parseInt(url.searchParams.get('offset') || '0', 10);
    
    // Validate pagination parameters
    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 100' },
        { status: 400 }
      );
    }
    
    if (offset < 0) {
      return NextResponse.json(
        { error: 'Offset must be 0 or greater' },
        { status: 400 }
      );
    }

    // Get all articles first (in a real implementation, this would be optimized with database pagination)
    const allArticles = await getAllArticles();
    
    // Apply pagination
    const paginatedArticles = allArticles.slice(offset, offset + limit);
    const total = allArticles.length;
    const hasMore = offset + limit < total;
    
    return NextResponse.json({
      articles: paginatedArticles,
      pagination: {
        limit,
        offset,
        total,
        hasMore,
        totalPages: Math.ceil(total / limit),
        currentPage: Math.floor(offset / limit) + 1
      }
    });
    
  } catch (error) {
    console.error('Error fetching paginated articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}