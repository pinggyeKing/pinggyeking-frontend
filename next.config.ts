import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // 프로덕션에서도 rewrites 활성화하되, HTTPS 백엔드 사용
    const upstream =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_BASE_URL || "https://49.50.133.127:8080" // HTTPS로 변경
        : process.env.NEXT_PUBLIC_API_BASE_URL || "http://49.50.133.127:8080";

    return [
      {
        source: "/api/:path*",
        destination: `${upstream}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
