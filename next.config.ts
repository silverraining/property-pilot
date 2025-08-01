import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/portfolios/real-estate",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    outputFileTracingExcludes: {
      '*': ['./backend/**/*'],
    },
  },
};

export default nextConfig;
