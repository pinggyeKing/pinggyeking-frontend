"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LottieLoading from "@/components/LottieLoading";

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    // 8초 후에 result 페이지로 이동
    const timer = setTimeout(() => {
      router.push("/result");
    }, 8000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center">
      <LottieLoading text={"핑계를 생성중이에요!"} />
    </div>
  );
}
