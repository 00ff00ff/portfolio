import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'export',
  images: { unoptimized: true },
  distDir: 'out',
  basePath: '/portfolio',
};

export default nextConfig;
