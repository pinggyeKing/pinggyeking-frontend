"use client";

import { useEffect } from "react";
import LottieLoading from "@/components/LottieLoading";
import { useLoadingLogic } from "./useLoadingLogic";

export default function Loading() {
  const {
    loadingText,
    generateComponentId,
    checkApiInProgress,
    setApiInProgress,
    executeApiCall,
  } = useLoadingLogic();

  useEffect(() => {
    // 컴포넌트 마운트 로그
    const componentId = generateComponentId();
    console.log(`🚀 Loading 컴포넌트 마운트 [${componentId}]`);

    // 이미 API 호출이 진행 중인지 확인
    if (checkApiInProgress()) {
      console.log(`⏸️ 이미 API 호출이 진행 중입니다 [${componentId}]`);
      return;
    }

    // API 호출 플래그 설정
    setApiInProgress(true);

    // AbortController를 사용하여 중복 API 호출 방지
    const abortController = new AbortController();

    // API 호출 실행
    executeApiCall(componentId, abortController);

    // cleanup 함수 - 컴포넌트 언마운트 시 AbortController로 API 호출 취소
    return () => {
      console.log(`🧹 컴포넌트 언마운트 - API 호출 취소 [${componentId}]`);
      abortController.abort();
      setApiInProgress(false);
    };
  }, []); // 의존성 배열 비우기 - 컴포넌트 마운트시에만 실행

  return (
    <div className="flex items-center justify-center">
      <LottieLoading text={loadingText} />
    </div>
  );
}
