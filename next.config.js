// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.rdworldonline.com',
        pathname: '/wp-content/uploads/**',
      },
      // Add other hostnames if necessary
    ],
  },
};

module.exports = nextConfig;
