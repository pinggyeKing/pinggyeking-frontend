// SessionStorage를 사용한 안전한 데이터 전달 (페이지 새로고침에 안전)

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

const STORAGE_KEYS = {
  FORM_DATA: "excuse_form_data_v2",
  RESULT: "excuse_result_v2",
  REGENERATION: "excuse_regeneration_v2",
} as const;

// SessionStorage 관리 클래스
export class ExcuseSessionStorage {
  // 폼 데이터 저장/로드
  static saveFormData(data: ExcuseFormData): void {
    try {
      sessionStorage.setItem(STORAGE_KEYS.FORM_DATA, JSON.stringify(data));
      console.log("[SessionStorage] 폼 데이터 저장 완료");
    } catch (error) {
      console.error("[SessionStorage] 폼 데이터 저장 실패:", error);
    }
  }

  static getFormData(): ExcuseFormData | null {
    try {
      const data = sessionStorage.getItem(STORAGE_KEYS.FORM_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("[SessionStorage] 폼 데이터 로드 실패:", error);
      return null;
    }
  }

  // 결과 데이터 저장/로드
  static saveResult(result: ExcuseResult): void {
    try {
      sessionStorage.setItem(STORAGE_KEYS.RESULT, JSON.stringify(result));
      console.log("[SessionStorage] 결과 데이터 저장 완료");
    } catch (error) {
      console.error("[SessionStorage] 결과 데이터 저장 실패:", error);
    }
  }

  static getResult(): ExcuseResult | null {
    try {
      const data = sessionStorage.getItem(STORAGE_KEYS.RESULT);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("[SessionStorage] 결과 데이터 로드 실패:", error);
      return null;
    }
  }

  // 재생성 정보 저장/로드
  static saveRegeneration(isRegeneration: boolean, option = ""): void {
    try {
      const data = { isRegeneration, option, timestamp: Date.now() };
      sessionStorage.setItem(STORAGE_KEYS.REGENERATION, JSON.stringify(data));
      console.log("[SessionStorage] 재생성 정보 저장 완료");
    } catch (error) {
      console.error("[SessionStorage] 재생성 정보 저장 실패:", error);
    }
  }

  static getRegeneration(): { isRegeneration: boolean; option: string } | null {
    try {
      const data = sessionStorage.getItem(STORAGE_KEYS.REGENERATION);
      if (!data) return null;

      const parsed = JSON.parse(data);
      // 30분 이상 오래된 데이터는 무시
      if (Date.now() - parsed.timestamp > 30 * 60 * 1000) {
        ExcuseSessionStorage.clearRegeneration();
        return null;
      }

      return { isRegeneration: parsed.isRegeneration, option: parsed.option };
    } catch (error) {
      console.error("[SessionStorage] 재생성 정보 로드 실패:", error);
      return null;
    }
  }

  // 데이터 삭제
  static clearFormData(): void {
    sessionStorage.removeItem(STORAGE_KEYS.FORM_DATA);
  }

  static clearResult(): void {
    sessionStorage.removeItem(STORAGE_KEYS.RESULT);
  }

  static clearRegeneration(): void {
    sessionStorage.removeItem(STORAGE_KEYS.REGENERATION);
  }

  static clearAll(): void {
    ExcuseSessionStorage.clearFormData();
    ExcuseSessionStorage.clearResult();
    ExcuseSessionStorage.clearRegeneration();
    console.log("[SessionStorage] 모든 데이터 삭제 완료");
  }
}

// Router와 함께 사용하는 헬퍼 함수들
import { useRouter } from "next/navigation";

export const useRouterWithSessionStorage = () => {
  const router = useRouter();

  const navigateToLoading = (
    formData: ExcuseFormData,
    isRegeneration = false,
    regenerationOption = ""
  ) => {
    ExcuseSessionStorage.saveFormData(formData);
    if (isRegeneration) {
      ExcuseSessionStorage.saveRegeneration(true, regenerationOption);
    }
    router.push("/loading");
  };

  const navigateToResult = (result: ExcuseResult) => {
    ExcuseSessionStorage.saveResult(result);
    ExcuseSessionStorage.clearRegeneration(); // 재생성 정보는 결과 페이지 도달 시 정리
    router.push("/result");
  };

  const navigateToCreate = () => {
    ExcuseSessionStorage.clearAll(); // 새로 시작할 때는 모든 데이터 정리
    router.push("/create");
  };

  return {
    navigateToLoading,
    navigateToResult,
    navigateToCreate,
    router,
  };
};
