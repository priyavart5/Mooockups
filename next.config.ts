// next.config.js
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['lucide-react'],
  images: {
    remotePatterns: [
      {
          protocol: 'https',
          hostname: 'mooockups.s3.ap-south-1.amazonaws.com',
          pathname: '**'
      },
      {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          pathname: '**'
      }
    ],
  },
  
};

export default nextConfig;
