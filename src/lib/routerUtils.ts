// Next.js Router로 데이터를 안전하게 전달하는 유틸리티

import { useRouter } from "next/navigation";

// 데이터 타입 정의
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

// URL 쿼리 파라미터로 데이터 전달 (간단한 데이터용)
export const useRouterWithData = () => {
  const router = useRouter();

  const pushWithFormData = (path: string, formData: ExcuseFormData) => {
    const params = new URLSearchParams({
      target: formData.target,
      tone: formData.tone,
      situation: formData.situation,
      additionalInfo: formData.additionalInfo || "",
      considerations: formData.considerations || "",
    });

    router.push(`${path}?${params.toString()}`);
  };

  const pushWithResult = (path: string, result: ExcuseResult) => {
    // 복잡한 객체는 Base64로 인코딩해서 전달
    const encodedResult = btoa(JSON.stringify(result));
    const params = new URLSearchParams({
      data: encodedResult,
    });

    router.push(`${path}?${params.toString()}`);
  };

  return { pushWithFormData, pushWithResult, router };
};

// URL에서 데이터 추출하는 훅
export const useDataFromURL = () => {
  const getFormDataFromURL = (): ExcuseFormData | null => {
    if (typeof window === "undefined") return null;

    const searchParams = new URLSearchParams(window.location.search);

    const target = searchParams.get("target");
    const tone = searchParams.get("tone");
    const situation = searchParams.get("situation");

    if (!target || !tone || !situation) return null;

    return {
      target,
      tone,
      situation,
      additionalInfo: searchParams.get("additionalInfo") || "",
      considerations: searchParams.get("considerations") || "",
    };
  };

  const getResultFromURL = (): ExcuseResult | null => {
    if (typeof window === "undefined") return null;

    const searchParams = new URLSearchParams(window.location.search);
    const encodedData = searchParams.get("data");

    if (!encodedData) return null;

    try {
      const decodedData = atob(encodedData);
      return JSON.parse(decodedData);
    } catch (error) {
      console.error("URL 데이터 디코딩 실패:", error);
      return null;
    }
  };

  return { getFormDataFromURL, getResultFromURL };
};
