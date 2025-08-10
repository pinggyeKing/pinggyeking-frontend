import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // NOTE: 실제 백엔드가 HTTPS 를 지원한다면 반드시 https:// 로 교체 필요
    // ex) https://api.excuselab.com
    const upstream =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://49.50.133.127:8080";

    return [
      {
        source: "/api/:path*",
        destination: `${upstream}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
