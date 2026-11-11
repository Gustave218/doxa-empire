import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/academy", destination: "/coaching", permanent: true },
      { source: "/academy/courses/:path*", destination: "/coaching", permanent: true },
      { source: "/academy/coaching", destination: "/coaching", permanent: true },
      { source: "/academy/ebooks/:path*", destination: "/ebooks", permanent: true },
      { source: "/study-in-kenya", destination: "/travel", permanent: true },
    ];
  },
};

export default nextConfig;
