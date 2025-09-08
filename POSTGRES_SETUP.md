# PostgreSQL Setup for Magazine Platform

## Quick Setup Steps:

### 1. Create Vercel Postgres Database

Option A: Via Vercel Dashboard (Recommended)
1. Go to your Vercel dashboard
2. Select your magazine project (or create it first)
3. Go to the "Storage" tab
4. Click "Create Database" → Select "Postgres"
5. Name it `magazine-db`
6. Select your region (closest to your users)

Option B: Via CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Create database
vercel postgres create magazine-db
```

### 2. Connect Database to Project  
```bash
# Pull environment variables from Vercel
vercel env pull .env.local
```

This will automatically add all required Postgres variables to your `.env.local`:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

### 3. Create Database Tables

After the database is connected, run the migration:

```bash
# Using psql directly
psql $POSTGRES_URL < scripts/create-tables.sql

# Or using the Vercel dashboard SQL editor
# Copy and paste the contents of scripts/create-tables.sql
```

### 4. Add Additional Environment Variables

Add these to your Vercel project settings (Settings → Environment Variables):

```env
WEBHOOK_TOKEN="your-secure-webhook-token-here"
REVALIDATE_TOKEN="your-secure-revalidate-token-here"
```

Generate secure tokens:
```bash
# Generate secure random tokens
openssl rand -base64 32
```

### 5. Deploy to Vercel

```bash
# If not already linked
vercel link

# Deploy to production
vercel --prod

# Or push to GitHub (if connected)
git add -A
git commit -m "feat: magazine platform with Vercel Postgres"
git push origin main
```

## Testing the Setup

### 1. Check Database Connection
```bash
curl https://your-magazine.vercel.app/api/health
```

### 2. Test Webhook Endpoint
```bash
curl -X POST "https://your-magazine.vercel.app/api/webhook" \
  -H "Authorization: Bearer YOUR_WEBHOOK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Article",
    "slug": "test-article",
    "excerpt": "This is a test",
    "content": "<p>Test content</p>",
    "author": {
      "name": "Test Author",
      "id": "test-1"
    },
    "category": "Technology",
    "tags": ["test"],
    "status": "published"
  }'
```

### 3. Verify Article Was Created
```bash
curl https://your-magazine.vercel.app/api/articles
```

## Integration with Publishing Platform

Once deployed, configure the publishing platform to send webhooks:

1. Add magazine as a new publisher in ContentPortal
2. Set webhook URL: `https://your-magazine.vercel.app/api/webhook`
3. Add the `WEBHOOK_TOKEN` to ContentPortal's configuration
4. Test publishing flow from ContentPortal

## Troubleshooting

### Database Connection Issues
- Ensure all `POSTGRES_*` environment variables are set
- Check that the database is in the same region as your functions
- Verify the database is active in Vercel dashboard

### Webhook Issues
- Check `WEBHOOK_TOKEN` matches between platforms
- Verify the webhook URL is correct
- Check Vercel function logs for errors

### Migration Issues
- Make sure tables don't already exist before running migration
- Use Vercel's SQL editor to manually run queries if needed
- Check for any SQL syntax errors in the migration file