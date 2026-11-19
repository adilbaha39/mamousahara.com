/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    unoptimized: false,
  },
  staticPageGenerationTimeout: 120,
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [{ source: '/admin', destination: '/dashboard.html', permanent: false }]
  },
}
module.exports = nextConfig
