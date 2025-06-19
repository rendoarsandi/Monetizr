import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://monetizr-api.rendoarsandi.workers.dev',
  },
};

export default nextConfig;
