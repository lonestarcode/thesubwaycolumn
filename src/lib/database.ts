import { Article } from '@/types';

// Use mock database whenever a Postgres connection string is not provided.
// This makes builds/deploys succeed even without `POSTGRES_URL` configured.
const useMockDatabase = !process.env.POSTGRES_URL;

if (process.env.NODE_ENV !== 'production') {
  console.log('🔧 Database environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    HAS_POSTGRES_URL: !!process.env.POSTGRES_URL,
    useMockDatabase,
  });
}

// Mock data for local development
const mockArticles: Article[] = [
  {
    id: 1,
    title: "Welcome to NYC Magazine",
    slug: "welcome-to-nyc-magazine", 
    content: "This is our first article showcasing the new magazine platform. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "NYC Editorial Team",
    featured_image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "The Future of NYC", 
    slug: "the-future-of-nyc",
    content: "Exploring what lies ahead for the greatest city in the world. From urban development to cultural evolution, we dive deep into NYC's trajectory.",
    author: "NYC Editorial Team",
    featured_image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 3,
    title: "Culture & Arts in the City",
    slug: "culture-arts-in-the-city", 
    content: "A comprehensive look at NYC's vibrant cultural scene, from Broadway to underground galleries and everything in between.",
    author: "NYC Editorial Team",
    featured_image: null,
    created_at: new Date(Date.now() - 172800000).toISOString()
  }
];

// Initialize database table
export async function initDatabase() {
  if (useMockDatabase) {
    console.log('🔧 Using mock database for local development');
    return;
  }

  try {
    const { sql } = await import('@vercel/postgres');

    // Create tables if they don't exist
    await sql`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        featured_image TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Add missing columns if they don't exist (for existing databases)
    try {
      await sql`
        ALTER TABLE articles ADD COLUMN IF NOT EXISTS featured_image TEXT
      `;
    } catch {
      // Column might already exist, ignore error
    }
    try {
      await sql`
        ALTER TABLE articles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      `;
    } catch {
      // Column might already exist, ignore error
    }
    
    // Categories table
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        slug TEXT PRIMARY KEY,
        name TEXT NOT NULL
      )
    `;

    // Article-Categories join table
    await sql`
      CREATE TABLE IF NOT EXISTS article_categories (
        article_id INT REFERENCES articles(id) ON DELETE CASCADE,
        category_slug TEXT REFERENCES categories(slug) ON DELETE CASCADE,
        PRIMARY KEY (article_id, category_slug)
      )
    `;

    // Site state (featured article)
    await sql`
      CREATE TABLE IF NOT EXISTS site_state (
        id INT PRIMARY KEY,
        featured_article_id INT REFERENCES articles(id)
      )
    `;

    // Ensure singleton row exists
    await sql`
      INSERT INTO site_state (id) VALUES (1)
      ON CONFLICT (id) DO NOTHING
    `;

    // Indexes
    try { await sql`CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug)`; } catch {}
    try { await sql`CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at)`; } catch {}
    try { await sql`CREATE INDEX IF NOT EXISTS idx_article_categories_article_id ON article_categories(article_id)`; } catch {}
    try { await sql`CREATE INDEX IF NOT EXISTS idx_article_categories_category_slug ON article_categories(category_slug)`; } catch {}

    console.log('✅ Database initialized (articles, categories, joins, site_state)');
  } catch (error) {
    console.error('❌ Database init error:', error);
  }
}

// Insert article with featured image support
export async function insertArticle(
  title: string,
  content: string,
  author: string,
  featured_image?: string | null,
  categories?: string[]
): Promise<{ id: number; slug: string }> {
  
  // Generate simple slug
  const slug = title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  if (useMockDatabase) {
    const newId = Math.max(...mockArticles.map(a => a.id)) + 1;
    console.log(`🔧 Mock: Would insert article "${title}" with ID ${newId}`);
    return { id: newId, slug };
  }

  try {
    // First ensure table exists
    await initDatabase();
    
    const { sql } = await import('@vercel/postgres');
    
    // Try to insert with original slug
    const result = await sql`
      INSERT INTO articles (title, slug, content, author, featured_image)
      VALUES (${title}, ${slug}, ${content}, ${author}, ${featured_image})
      RETURNING id, slug
    `;

    // Assign categories if provided
    if (categories && categories.length > 0) {
      for (const cat of categories) {
        await sql`
          INSERT INTO article_categories (article_id, category_slug)
          VALUES (${result.rows[0].id}, ${cat})
          ON CONFLICT DO NOTHING
        `;
      }
    }
    
    return {
      id: result.rows[0].id,
      slug: result.rows[0].slug
    };
    
  } catch (error: unknown) {
    // Handle unique constraint violation (duplicate slug)
    const dbError = error as { message?: string; code?: string };
    if (dbError.message?.includes('duplicate key') || dbError.code === '23505') {
      // Add timestamp to make slug unique
      const uniqueSlug = `${slug}-${Date.now()}`;
      
      const { sql } = await import('@vercel/postgres');
      const result = await sql`
        INSERT INTO articles (title, slug, content, author, featured_image)
        VALUES (${title}, ${uniqueSlug}, ${content}, ${author}, ${featured_image})
        RETURNING id, slug
      `;

      if (categories && categories.length > 0) {
        for (const cat of categories) {
          await sql`
            INSERT INTO article_categories (article_id, category_slug)
            VALUES (${result.rows[0].id}, ${cat})
            ON CONFLICT DO NOTHING
          `;
        }
      }
      
      return {
        id: result.rows[0].id,
        slug: result.rows[0].slug
      };
    } else {
      console.error('❌ Insert article error:', error);
      throw error;
    }
  }
}

// Get featured article (most recent)
export async function getFeaturedArticle(): Promise<Article | null> {
  if (useMockDatabase) {
    console.log('🔧 Mock: Getting featured article');
    return mockArticles[0] || null;
  }

  try {
    const { sql } = await import('@vercel/postgres');
    await initDatabase();
    
    // Simple blog logic: get the most recent article as featured
    const result = await sql`SELECT * FROM articles ORDER BY created_at DESC LIMIT 1`;
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      author: row.author,
      featured_image: row.featured_image,
      created_at: row.created_at
    };
    
  } catch (error) {
    console.error('❌ Get featured article error:', error);
    return null;
  }
}

// Get recent articles (excluding the featured one)
export async function getRecentArticles(limit: number = 4): Promise<Article[]> {
  if (useMockDatabase) {
    console.log(`🔧 Mock: Getting ${limit} recent articles`);
    return mockArticles.slice(0, limit);
  }

  try {
    const { sql } = await import('@vercel/postgres');
    await initDatabase();
    
    // Simple blog logic: get most recent articles
    const result = await sql`SELECT * FROM articles ORDER BY created_at DESC LIMIT ${limit}`;
    
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      author: row.author,
      featured_image: row.featured_image,
      created_at: row.created_at
    }));
    
  } catch (error) {
    console.error('❌ Get recent articles error:', error);
    return [];
  }
}

// Get all articles for archive page
export async function getAllArticles(): Promise<Article[]> {
  if (useMockDatabase) {
    console.log('🔧 Mock: Getting all articles');
    return mockArticles;
  }

  try {
    const { sql } = await import('@vercel/postgres');
    await initDatabase();
    
    const result = await sql`
      SELECT * FROM articles 
      ORDER BY created_at DESC
    `;
    
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      author: row.author,
      featured_image: row.featured_image,
      created_at: row.created_at
    }));
    
  } catch (error) {
    console.error('❌ Get all articles error:', error);
    return [];
  }
}

// Get article by slug for individual article pages
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (useMockDatabase) {
    console.log(`🔧 Mock: Getting article by slug: ${slug}`);
    return mockArticles.find(article => article.slug === slug) || null;
  }

  try {
    const { sql } = await import('@vercel/postgres');
    await initDatabase();
    
    const result = await sql`
      SELECT * FROM articles 
      WHERE slug = ${slug}
      LIMIT 1
    `;
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      author: row.author,
      featured_image: row.featured_image,
      created_at: row.created_at
    };
    
  } catch (error) {
    console.error('❌ Get article by slug error:', error);
    return null;
  }
}

// Get article by ID for API operations
export async function getArticleById(id: number): Promise<Article | null> {
  if (useMockDatabase) {
    console.log(`🔧 Mock: Getting article by ID: ${id}`);
    return mockArticles.find(article => article.id === id) || null;
  }

  try {
    const { sql } = await import('@vercel/postgres');
    await initDatabase();
    
    const result = await sql`
      SELECT * FROM articles 
      WHERE id = ${id}
      LIMIT 1
    `;
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      author: row.author,
      featured_image: row.featured_image,
      created_at: row.created_at
    };
    
  } catch (error) {
    console.error('❌ Get article by ID error:', error);
    return null;
  }
}

// Update article by ID
export async function updateArticleById(
  id: number,
  title?: string,
  content?: string,
  author?: string,
  featured_image?: string | null,
  categories?: string[]
): Promise<boolean> {
  if (useMockDatabase) {
    console.log(`🔧 Mock: Would update article ID ${id}`);
    return true;
  }

  try {
    const { sql } = await import('@vercel/postgres');
    await initDatabase();
    
    // Build update query dynamically based on provided fields
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;
    
    if (title !== undefined) {
      updates.push(`title = $${paramIndex}`);
      values.push(title);
      paramIndex++;
    }
    
    if (content !== undefined) {
      updates.push(`content = $${paramIndex}`);
      values.push(content);
      paramIndex++;
    }
    
    if (author !== undefined) {
      updates.push(`author = $${paramIndex}`);
      values.push(author);
      paramIndex++;
    }
    
    if (featured_image !== undefined) {
      updates.push(`featured_image = $${paramIndex}`);
      values.push(featured_image);
      paramIndex++;
    }
    
    // Always update the updated_at timestamp
    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    
    if (updates.length === 1) { // Only updated_at was added
      console.log('No fields to update');
      return false;
    }
    
    // Add ID as the last parameter
    values.push(id);
    
    const queryText = `
      UPDATE articles 
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
    `;
    
    const result = await sql.query(queryText, values);
    
    // Update categories if provided
    if (categories !== undefined) {
      // Remove existing categories
      await sql`DELETE FROM article_categories WHERE article_id = ${id}`;
      
      // Add new categories
      for (const cat of categories) {
        await sql`
          INSERT INTO article_categories (article_id, category_slug)
          VALUES (${id}, ${cat})
          ON CONFLICT DO NOTHING
        `;
      }
    }
    
    return (result.rowCount || 0) > 0;
    
  } catch (error) {
    console.error('❌ Update article error:', error);
    return false;
  }
}

// Delete article by ID
export async function deleteArticleById(id: number): Promise<boolean> {
  if (useMockDatabase) {
    console.log(`🔧 Mock: Would delete article ID ${id}`);
    return true;
  }

  try {
    const { sql } = await import('@vercel/postgres');
    await initDatabase();
    
    // Delete the article (categories will be deleted automatically due to CASCADE)
    const result = await sql`
      DELETE FROM articles 
      WHERE id = ${id}
    `;
    
    return (result.rowCount || 0) > 0;
    
  } catch (error) {
    console.error('❌ Delete article error:', error);
    return false;
  }
}