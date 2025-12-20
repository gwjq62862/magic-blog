import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',

      }, {
        protocol: 'https',
        hostname: 'dynamic-orca-64.convex.cloud',

      }, {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',

      },
    ],
  },
};

export default nextConfig;
