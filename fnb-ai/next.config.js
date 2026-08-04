/** @type {import('next').NextConfig} */
const NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.shopify.com'],
  },
  async rewrites() {
    const isProd = process.env.NODE_ENV === 'production'
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.API_URL ||
      (isProd ? 'https://food-analysis-ai-2-ki2u.onrender.com' : 'http://127.0.0.1:8000')
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ]
  },
}
module.exports = NextConfig
