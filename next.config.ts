import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.ytimg.com",
        protocol: "https",
      },
      {
        hostname: "yt3.ggpht.com",
        protocol: "https",
      },
      {
        hostname: "dusty-puma-150.convex.cloud",
        protocol: "https",
      },
    ],
  },
  experimental: {
    externalDir: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    //ignoreDuringBuilds: true,
  },
  /* config options here */
};

export default nextConfig;
// next.config.js
