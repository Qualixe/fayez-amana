import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Default is 1MB; the hero background video upload needs more room.
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;
