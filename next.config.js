/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    minimumCacheTTL: 3600,
    domains: [
      "localhost",
      's3-ap-southeast-1.amazonaws.com',
      "www.zenius.net"
    ],
  }
}

module.exports = nextConfig
