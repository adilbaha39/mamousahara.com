/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  staticPageGenerationTimeout: 120,
  compress: true,
  poweredByHeader: false,
}
module.exports = nextConfig
