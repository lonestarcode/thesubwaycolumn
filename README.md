# Magazine Platform

A Next.js-based digital magazine platform designed for Vercel deployment with webhook integration for content publishing.

## Architecture

- **Framework**: Next.js 15 with App Router
- **Database**: Vercel Postgres
- **Deployment**: Vercel
- **Integration**: Webhook-based content publishing from external CMS

## Features

- ✅ Server-side rendered articles
- ✅ Webhook endpoint for content publishing
- ✅ Cache revalidation on content updates
- ✅ Article listing with sidebar
- ✅ Category organization
- ✅ View tracking
- ✅ Responsive design

## Setup

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Configure your Vercel Postgres database in `.env.local`

4. Run database migrations:
```bash
psql $POSTGRES_URL < scripts/create-tables.sql
```

5. Start development server:
```bash
npm run dev
```

### Vercel Deployment

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `POSTGRES_URL` (auto-configured with Vercel Postgres)
   - `WEBHOOK_TOKEN` (secure token for webhook auth)
   - `REVALIDATE_TOKEN` (secure token for cache revalidation)

## API Endpoints

### Webhook Publishing
```
POST /api/webhook
Authorization: Bearer YOUR_WEBHOOK_TOKEN
Content-Type: application/json

{
  "title": "Article Title",
  "slug": "article-slug",
  "excerpt": "Brief description",
  "content": "Full HTML content",
  "featuredImage": "https://example.com/image.jpg",
  "author": {
    "name": "Author Name",
    "id": "author-id"
  },
  "category": "Technology",
  "tags": ["tag1", "tag2"],
  "status": "published"
}
```

### Cache Revalidation
```
POST /api/revalidate
Authorization: Bearer YOUR_REVALIDATE_TOKEN
Content-Type: application/json

{
  "slugs": ["article-slug"],
  "paths": ["/"],
  "all": false
}
```

### Get Articles
```
GET /api/articles?category=technology&limit=10&offset=0
```

### Get Single Article
```
GET /api/articles/article-slug
```

## Publishing Integration

The magazine platform receives content from the publishing platform via webhooks:

1. Publishing platform creates/updates content
2. Sends webhook POST to `/api/webhook`
3. Magazine stores article in Vercel Postgres
4. Triggers cache revalidation for updated paths
5. Content appears on the magazine site

## Database Schema

```sql
articles
- id (primary key)
- title
- slug (unique)
- excerpt
- content
- featured_image
- author_name
- author_id
- category
- tags (jsonb)
- status
- published_at
- view_count
- like_count
- featured (boolean)
```

## Future Enhancements

- [ ] Multiple author profiles with dedicated pages
- [ ] Advanced category management
- [ ] Editorial workflow for content approval
- [ ] Comment system
- [ ] Newsletter integration
- [ ] Search functionality
- [ ] Analytics dashboard