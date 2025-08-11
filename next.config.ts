import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // 서버사이드 프록시: 클라이언트는 상대경로(/api/*)로 요청하고
    // Next.js 서버가 HTTP 백엔드로 프록시 (Mixed Content 방지)
    const backendUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "//49.50.133.127:8081";

    console.log(`[Rewrites] Proxying /api/* to ${backendUrl}/api/*`);

    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
