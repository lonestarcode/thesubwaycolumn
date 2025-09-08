import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization') || '';
  const token = process.env.REVALIDATE_TOKEN;

  if (!token || authHeader !== `Bearer ${token}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  type RevalidateBody = {
    paths?: unknown;
    slugs?: unknown;
    all?: unknown;
  };
  let body: RevalidateBody = {};
  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    body = {};
  }

  const inputPaths: unknown = body?.paths;
  const inputSlugs: unknown = body?.slugs;
  const all: boolean = !!body?.all;

  const paths = Array.isArray(inputPaths) ? inputPaths.filter((p): p is string => typeof p === 'string') : [];
  const slugs = Array.isArray(inputSlugs) ? inputSlugs.filter((s): s is string => typeof s === 'string') : [];

  const toRevalidate = new Set<string>();
  if (all) {
    toRevalidate.add('/');
    toRevalidate.add('/articles');
  }
  for (const p of paths) {
    if (p.startsWith('/')) toRevalidate.add(p);
  }
  for (const slug of slugs) {
    if (slug) toRevalidate.add(`/article/${slug}`);
  }
  if (toRevalidate.size === 0) {
    toRevalidate.add('/');
  }

  const revalidated: string[] = [];
  for (const p of toRevalidate) {
    revalidatePath(p);
    revalidated.push(p);
  }

  return NextResponse.json({ revalidated, timestamp: Date.now() });
}