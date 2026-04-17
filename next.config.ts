import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'export',
  images: { unoptimized: true },
  distDir: 'out',
  trailingSlash: true,
  assetPrefix: '/portfolio',
};

export default nextConfig;
