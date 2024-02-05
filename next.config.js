/** @type {import('next').NextConfig} */

const nextConfig = {
  // Allow loading images from any domain
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Experimental features
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
