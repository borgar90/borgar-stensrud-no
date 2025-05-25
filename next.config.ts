import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // 🔥 Dette lar build gå gjennom selv med ESLint-feil
  },
};

export default nextConfig;
