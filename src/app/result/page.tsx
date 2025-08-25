"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();

  useEffect(() => {
    // localStorage에서 결과 데이터 확인
    const savedResult = localStorage.getItem("excuse_result");
    if (savedResult) {
      try {
        const resultData = JSON.parse(savedResult);
        if (resultData.id) {
          // ID가 있으면 dynamic route로 리다이렉트
          router.replace(`/result/${resultData.id}`);
          return;
        }
      } catch (error) {
        console.error("결과 데이터 파싱 오류:", error);
      }
    }

    // 결과 데이터가 없으면 홈으로 리다이렉트
    router.replace("/");
  }, [router]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-section-title text-grey-10">
        결과 페이지로 이동 중...
      </div>
    </div>
  );
}
