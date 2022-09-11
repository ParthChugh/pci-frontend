/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  i18n,
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
