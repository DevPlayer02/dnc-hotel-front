import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "dnc-hotel-production.up.railway.app",
        port: "3000",
        pathname: "/uploads-hotel/**",
      },
      {
        protocol: "http",
        hostname: "dnc-hotel-production.up.railway.app",
        port: "3000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
