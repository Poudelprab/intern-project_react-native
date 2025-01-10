import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
      protocol: "https",
      hostname:"khrqmmwagoomfgrdhtrh.supabase.co",
      },
      {
        protocol: "https",
        hostname:"www.facebook.com",
        },
      

    ],
},
};

export default nextConfig;
