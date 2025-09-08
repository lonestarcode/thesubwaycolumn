-- Simple schema matching the blog for immediate publishing program compatibility
-- This matches exactly what the blog uses for seamless integration

-- Create articles table (simple blog schema)
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  featured_image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table (simple blog schema)
CREATE TABLE IF NOT EXISTS categories (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

-- Article-Categories join table
CREATE TABLE IF NOT EXISTS article_categories (
  article_id INT REFERENCES articles(id) ON DELETE CASCADE,
  category_slug TEXT REFERENCES categories(slug) ON DELETE CASCADE,
  PRIMARY KEY (article_id, category_slug)
);

-- Site state (featured article)
CREATE TABLE IF NOT EXISTS site_state (
  id INT PRIMARY KEY,
  featured_article_id INT REFERENCES articles(id)
);

-- Ensure singleton row exists
INSERT INTO site_state (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- Basic indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at);
CREATE INDEX IF NOT EXISTS idx_article_categories_article_id ON article_categories(article_id);
CREATE INDEX IF NOT EXISTS idx_article_categories_category_slug ON article_categories(category_slug);