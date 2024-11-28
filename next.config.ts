import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['lucide-react'],
  images: {
    domains: ['mockup-by-pv.s3.ap-south-1.amazonaws.com','images.unsplash.com'],
  },
};

export default nextConfig;
