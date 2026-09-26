/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the site must be hostable as flat files and must make
  // zero automatic third-party requests. The terminal uses system monospace fonts.
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  // Keeps the dev badge out of review screenshots.
  devIndicators: false,
}

export default nextConfig
