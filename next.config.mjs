// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ELASTICSEARCH_URL: "http://localhost:9200",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.rdworldonline.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "media-rd.s3.amazonaws.com",
        pathname: "/**",
      },
      // Add other hostnames if necessary
    ],
  },
  // Remove any custom webpack configuration for CSS processing
};

export default nextConfig;