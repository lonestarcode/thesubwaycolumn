import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  const status = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: 'disconnected',
    environment: process.env.NODE_ENV,
    hasSiteApiToken: !!process.env.SITE_API_TOKEN,
    hasRevalidateToken: !!process.env.REVALIDATE_TOKEN,
  };

  // Check database connection
  if (process.env.POSTGRES_URL) {
    try {
      await sql`SELECT NOW() as current_time`;
      status.database = 'connected';
      
      // Check if articles table exists
      const tableCheck = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_name = 'articles'
        ) as table_exists
      `;
      
      if (tableCheck.rows[0]?.table_exists) {
        const countResult = await sql`SELECT COUNT(*) as count FROM articles`;
        status.database = `connected (${countResult.rows[0].count} articles)`;
      } else {
        status.database = 'connected (tables not created yet)';
      }
    } catch (error) {
      status.database = `error: ${error instanceof Error ? error.message : 'unknown'}`;
    }
  } else {
    status.database = 'not configured (POSTGRES_URL missing)';
  }

  return NextResponse.json(status);
}