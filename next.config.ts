import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["dnc-hotel-production.up.railway.app"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dnc-hotel-production.up.railway.app",
        pathname: "/uploads-hotel/**",
      },
      {
        protocol: "https",
        hostname: "dnc-hotel-production.up.railway.app",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;