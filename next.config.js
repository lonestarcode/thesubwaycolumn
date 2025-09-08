/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Disable caching to prevent deployment issues
  generateBuildId: async () => {
    // Add git commit hash to force new builds
    const commitHash = process.env.VERCEL_GIT_COMMIT_SHA || Date.now().toString()
    return `build-${commitHash}-${Date.now()}`
  },

  // Add headers to prevent aggressive caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Allow Next.js runtime and hydration scripts
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://platform.twitter.com",
              // Allow inline styles (Tailwind) and self-hosted fonts
              "style-src 'self' 'unsafe-inline'",
              // Allow images from Vercel Blob, https, data URIs
              "img-src 'self' https: data: blob: *",
              "font-src 'self' https: data:",
              // Allow API calls and analytics over HTTPS and websockets
              "connect-src 'self' https: wss: data:",
              // Allow embedding trusted providers in iframes
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://platform.twitter.com https://player.vimeo.com https://www.tiktok.com https://open.spotify.com https://www.loom.com",
              "child-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://platform.twitter.com https://player.vimeo.com https://www.tiktok.com https://open.spotify.com https://www.loom.com",
              // Disallow this site from being framed elsewhere
              "frame-ancestors 'none'",
              // Allow workers if needed by Next (e.g., in dev tools)
              "worker-src 'self' blob:",
            ].join('; '),
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    dangerouslyAllowSVG: true,
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig