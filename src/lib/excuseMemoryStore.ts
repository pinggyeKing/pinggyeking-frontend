// 단순히 router.push 시 state로 데이터 전달하는 방법
// 페이지 새로고침에는 데이터가 사라지지만 일반적인 네비게이션에는 문제없음

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export interface ExcuseFormData {
  target: string;
  tone: string;
  situation: string;
  additionalInfo?: string;
  considerations?: string;
}

export interface ExcuseResult {
  excuse: {
    content: string;
    tip?: string;
  };
  imageKey?: string;
  id?: number;
}

// 전역 상태 관리 (간단한 메모리 저장소)
class MemoryStore {
  private formData: ExcuseFormData | null = null;
  private result: ExcuseResult | null = null;
  private regenerationInfo: { isRegeneration: boolean; option: string } | null =
    null;

  setFormData(data: ExcuseFormData) {
    this.formData = data;
    console.log("[MemoryStore] 폼 데이터 저장:", data);
  }

  getFormData(): ExcuseFormData | null {
    return this.formData;
  }

  setResult(result: ExcuseResult) {
    this.result = result;
    console.log("[MemoryStore] 결과 데이터 저장:", result);
  }

  getResult(): ExcuseResult | null {
    return this.result;
  }

  setRegeneration(isRegeneration: boolean, option = "") {
    this.regenerationInfo = { isRegeneration, option };
    console.log("[MemoryStore] 재생성 정보 저장:", { isRegeneration, option });
  }

  getRegeneration(): { isRegeneration: boolean; option: string } | null {
    return this.regenerationInfo;
  }

  clear() {
    this.formData = null;
    this.result = null;
    this.regenerationInfo = null;
    console.log("[MemoryStore] 모든 데이터 삭제");
  }
}

const memoryStore = new MemoryStore();

// Router + State 관리 훅
export const useRouterWithState = () => {
  const router = useRouter();

  const navigateToLoading = (
    formData: ExcuseFormData,
    isRegeneration = false,
    regenerationOption = ""
  ) => {
    memoryStore.setFormData(formData);
    if (isRegeneration) {
      memoryStore.setRegeneration(true, regenerationOption);
    }
    router.push("/loading");
  };

  const navigateToResult = (result: ExcuseResult) => {
    memoryStore.setResult(result);
    memoryStore.setRegeneration(false); // 재생성 정보 초기화
    router.push("/result");
  };

  const navigateToCreate = () => {
    memoryStore.clear(); // 새로 시작할 때는 모든 데이터 정리
    router.push("/create");
  };

  return {
    navigateToLoading,
    navigateToResult,
    navigateToCreate,
    router,
  };
};

// 각 페이지에서 데이터를 가져오는 훅들
export const useFormData = () => {
  const [formData, setFormData] = useState<ExcuseFormData | null>(null);

  useEffect(() => {
    const data = memoryStore.getFormData();
    setFormData(data);
  }, []);

  return formData;
};

export const useResultData = () => {
  const [result, setResult] = useState<ExcuseResult | null>(null);

  useEffect(() => {
    const data = memoryStore.getResult();
    setResult(data);
  }, []);

  return result;
};

export const useRegenerationData = () => {
  const [regenerationInfo, setRegenerationInfo] = useState<{
    isRegeneration: boolean;
    option: string;
  } | null>(null);

  useEffect(() => {
    const data = memoryStore.getRegeneration();
    setRegenerationInfo(data);
  }, []);

  return regenerationInfo;
};

// 직접 메모리 스토어 접근이 필요한 경우
export const getMemoryStore = () => memoryStore;
