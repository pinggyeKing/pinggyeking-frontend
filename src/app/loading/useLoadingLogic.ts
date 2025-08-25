// 로딩 페이지 비즈니스 로직을 담은 커스텀 훅

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/common/Toast";
import { generateExcuse } from "@/lib/api";

import {
  API_CALL_FLAG,
  LOADING_TEXTS,
  LOADING_TEXT_INTERVAL,
  NAVIGATION_DELAY,
  ERROR_MESSAGES,
} from "./constants";

import {
  getFormDataFromStorage,
  getExistingResult,
  isRegenerationMode,
  getRegenerationOption,
  saveExcuseResult,
  saveCharacterType,
  clearRegenerationData,
  getResultPageUrl,
  buildApiRequest,
  getErrorMessage,
  isAbortError,
  logError,
} from "./utils";

export const useLoadingLogic = () => {
  const router = useRouter();
  const { showInfoToast } = useToast();
  const [loadingText, setLoadingText] = useState(LOADING_TEXTS[0]);

  const generateComponentId = useCallback(() => {
    return Math.random().toString(36).substr(2, 9);
  }, []);

  const checkApiInProgress = useCallback(() => {
    return !!(window as any)[API_CALL_FLAG];
  }, []);

  const setApiInProgress = useCallback((value: boolean) => {
    (window as any)[API_CALL_FLAG] = value;
  }, []);

  const startLoadingTextAnimation = useCallback(() => {
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % LOADING_TEXTS.length;
      setLoadingText(LOADING_TEXTS[textIndex]);
    }, LOADING_TEXT_INTERVAL);

    return () => clearInterval(textInterval);
  }, []);

  const navigateToResult = useCallback(
    (result: any) => {
      setTimeout(() => {
        const url = result.id ? `/result/${result.id}` : "/result";
        router.push(url);
      }, NAVIGATION_DELAY);
    },
    [router]
  );

  const handleExistingResult = useCallback(
    (componentId: string) => {
      const existingResult = getExistingResult();
      const isRegeneration = isRegenerationMode();

      if (existingResult && !isRegeneration) {
        console.log(`📋 기존 결과 발견, 결과 페이지로 이동 [${componentId}]`);
        setTimeout(() => {
          const url = getResultPageUrl(existingResult);
          router.push(url);
        }, NAVIGATION_DELAY);
        return true;
      }

      return false;
    },
    [router]
  );

  const handleAbortError = useCallback(
    (componentId: string) => {
      console.log(`🚫 API 호출이 정상적으로 취소되었습니다 [${componentId}]`);
      setApiInProgress(false);

      const existingResult = getExistingResult();
      if (existingResult) {
        console.log(`📋 AbortError이지만 기존 결과로 이동 [${componentId}]`);
        const url = getResultPageUrl(existingResult);
        router.push(url);
        return;
      }

      console.log(
        `🏠 AbortError이고 기존 결과 없음 - 홈으로 이동 [${componentId}]`
      );
      router.push("/");
    },
    [router, setApiInProgress]
  );

  const executeApiCall = useCallback(
    async (componentId: string, abortController: AbortController) => {
      try {
        console.log(`📞 API 호출 시작 [${componentId}]`);

        if (abortController.signal.aborted) {
          console.log(`❌ API 호출이 이미 취소됨 [${componentId}]`);
          return;
        }

        // 폼 데이터 확인
        const formData = getFormDataFromStorage();
        if (!formData) {
          console.log(`❌ 폼 데이터가 없음 [${componentId}]`);
          showInfoToast(ERROR_MESSAGES.NO_FORM_DATA);
          router.push("/");
          return;
        }

        // 기존 결과 확인
        if (handleExistingResult(componentId)) {
          return;
        }

        const isRegeneration = isRegenerationMode();
        const regenerationOption = getRegenerationOption();

        console.log(`🔄 재생성 여부: ${isRegeneration} [${componentId}]`);
        console.log(`🚀 새로운 API 호출 진행 [${componentId}]`);

        // API 요청 데이터 구성
        const requestData = buildApiRequest(formData, regenerationOption);

        // 로딩 텍스트 애니메이션 시작
        const stopAnimation = startLoadingTextAnimation();

        console.log(`📤 API 요청 데이터 [${componentId}]:`, requestData);

        // API 호출 전 abort 확인
        if (abortController.signal.aborted) {
          console.log(`❌ API 호출이 취소되었습니다 [${componentId}]`);
          return;
        }

        // API 호출
        console.log(`🌐 generateExcuse API 호출 실행 [${componentId}]`);
        const response = await generateExcuse(requestData);
        console.log(`✅ API 응답 받음 [${componentId}]:`, response);

        // 결과 저장
        saveExcuseResult(response);
        if (response.imageKey) {
          saveCharacterType(response.imageKey);
        }

        // 임시 데이터 정리
        clearRegenerationData();
        stopAnimation();
        setApiInProgress(false);

        // 결과 페이지로 이동
        navigateToResult(response);
      } catch (error: any) {
        logError(error, componentId);

        if (isAbortError(error)) {
          handleAbortError(componentId);
          return;
        }

        const errorMessage = getErrorMessage(error);
        showInfoToast(errorMessage);

        clearRegenerationData();
        setApiInProgress(false);
      }
    },
    [
      router,
      showInfoToast,
      handleExistingResult,
      startLoadingTextAnimation,
      navigateToResult,
      handleAbortError,
      setApiInProgress,
    ]
  );

  return {
    loadingText,
    generateComponentId,
    checkApiInProgress,
    setApiInProgress,
    executeApiCall,
  };
};
