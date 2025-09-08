#!/bin/bash

echo "Magazine Platform - Database Setup Script"
echo "========================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

echo "✅ Vercel CLI is installed"
echo ""

# Login to Vercel
echo "📝 Please login to Vercel:"
vercel login

# Link the project
echo ""
echo "🔗 Linking project to Vercel..."
vercel link

# Check if database exists
echo ""
echo "🗄️ Setting up Postgres database..."
echo "Do you want to create a new database? (y/n)"
read -r CREATE_DB

if [ "$CREATE_DB" = "y" ]; then
    vercel postgres create magazine-db
fi

# Pull environment variables
echo ""
echo "📥 Pulling environment variables..."
vercel env pull .env.local

# Check if webhook tokens need to be added
echo ""
echo "🔐 Checking webhook tokens..."

if ! grep -q "WEBHOOK_TOKEN" .env.local; then
    echo "Generating WEBHOOK_TOKEN..."
    WEBHOOK_TOKEN=$(openssl rand -base64 32)
    echo "WEBHOOK_TOKEN=\"$WEBHOOK_TOKEN\"" >> .env.local
    echo "Adding WEBHOOK_TOKEN to Vercel..."
    echo "$WEBHOOK_TOKEN" | vercel env add WEBHOOK_TOKEN production
fi

if ! grep -q "REVALIDATE_TOKEN" .env.local; then
    echo "Generating REVALIDATE_TOKEN..."
    REVALIDATE_TOKEN=$(openssl rand -base64 32)
    echo "REVALIDATE_TOKEN=\"$REVALIDATE_TOKEN\"" >> .env.local
    echo "Adding REVALIDATE_TOKEN to Vercel..."
    echo "$REVALIDATE_TOKEN" | vercel env add REVALIDATE_TOKEN production
fi

# Run migrations
echo ""
echo "📊 Do you want to run database migrations? (y/n)"
read -r RUN_MIGRATIONS

if [ "$RUN_MIGRATIONS" = "y" ]; then
    if [ -f "scripts/create-tables.sql" ]; then
        echo "Running migrations..."
        psql $POSTGRES_URL < scripts/create-tables.sql
        echo "✅ Migrations complete"
    else
        echo "❌ Migration file not found: scripts/create-tables.sql"
    fi
fi

# Test the setup
echo ""
echo "🧪 Testing setup..."
npm run dev &
DEV_PID=$!
sleep 5

echo "Testing health endpoint..."
curl -s http://localhost:3000/api/health | jq .

kill $DEV_PID

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Deploy to Vercel: vercel --prod"
echo "2. Configure publishing platform webhook to: https://your-magazine.vercel.app/api/webhook"
echo "3. Use the WEBHOOK_TOKEN from .env.local in the publishing platform"