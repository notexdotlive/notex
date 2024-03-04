/** @type {import('next').NextConfig} */

const nextConfig = {
  /**
   * Turn off the default behavior of Next.js to optimize font loading
   * @see https://nextjs.org/docs/app/building-your-application/optimizing/fonts
   */
  optimizeFonts: false,
  /**
   * Allow loading images from any domain
   * @see https://nextjs.org/docs/app/building-your-application/optimizing/images
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  /**
   * Experimental features
   */
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  /**
   * Rewrites
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/rewrites
   */
  rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'api.notex.live',
            },
          ],
          destination: '/api/:path*',
        },
      ],
    };
  },
};

module.exports = nextConfig;
