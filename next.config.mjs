/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
      },
    ],
  },
  async rewrites() {
    const destination = process.env.PRODUCTION_API_URL
      ? `${process.env.PRODUCTION_API_URL}/api/:path*`
      : 'http://localhost:5000/api/:path*';

    if (!destination.startsWith('http')) {
      throw new Error('Invalid PRODUCTION_API_URL environment variable');
    }

    return [
      {
        source: '/api/:path*',
        destination,
      },
    ];
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? process.env.PRODUCTION_API_URL 
      : 'http://localhost:5000',
  },
  async headers() {
    const allowedOrigin = process.env.NODE_ENV === 'production'
      ? process.env.ALLOWED_ORIGIN || 'https://default-production-origin.com'
      : '*';

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: allowedOrigin,
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

export default nextConfig;