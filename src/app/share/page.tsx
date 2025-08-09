"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SharePage() {
  const router = useRouter();

  useEffect(() => {
    // 예시 excuseId로 리다이렉트 (실제로는 실제 ID를 사용해야 함)
    router.replace("/share/sample-excuse-123");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>리다이렉트 중...</p>
    </div>
  );
}
