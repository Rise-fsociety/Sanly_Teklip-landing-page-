import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.105'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.ADMIN_HOSTNAME}`,
        port: '',
        pathname: '/public/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/excell/carusel/:path*',
        destination: 'https://sanlyteklip.com.tm:3006/api/carusel/:path*',
      },
      {
        source: '/api/Maincategory/:path*',
        destination: 'https://sanlyteklip.com.tm:3006/api/Maincategory/:path*',
      },
      {
        source: '/api/excell/:path*',
        destination: 'https://sanlyteklip.com.tm:3006/api/excell/:path*',
      },
    ];
  },
};

export default withNextIntl(nextConfig);