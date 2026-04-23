// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        // ব্রাউজার এই রুটে রিকোয়েস্ট পাঠাবে
        source: '/server/:path*',
        // Next.js বিহাইন্ড-দ্য-সিনে এই রুটে প্রক্সি করে দিবে
        destination: 'https://skill-bridge-server-two.vercel.app/api/:path*',
      },
    ];
  },
};

export default nextConfig;