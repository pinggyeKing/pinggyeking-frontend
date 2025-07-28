"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSplash } from "@/contexts/SplashContext";

const SplashPage = () => {
  const { setShowSplash } = useSplash();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // 1.5초 후 로딩 시작
    const startTimer = setTimeout(() => {
      setShowLoading(true);
    }, 1500);

    // 5초 후 스플래시 숨기기
    const redirectTimer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem("hasVisited", "true");
    }, 5000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(redirectTimer);
    };
  }, [setShowSplash]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
        <div className="mb-8 transform transition-all duration-1000 ease-out">
          <div className="relative">
            <Image
              src="/Logo.svg"
              alt="변명 연구소 로고"
              width={245}
              height={234}
              priority
              className="drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
