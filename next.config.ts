import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: ["bccdev-workshop-fe.bccdev.id"],
    },
  },
};

export default nextConfig;
