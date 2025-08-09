import axios from "axios";

// API 기본 설정
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://49.50.133.127:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 인터셉터 (에러 처리)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// API 응답 타입 정의
export interface ExcuseDetailResponse {
  excuse: string;
  situation: string;
  target: string;
  tone: string;
}

export interface GalleryResponse {
  totalExcuses: number;
  averageSatisfaction: number;
  regenerationRate: number;
  peakTime: {
    hour: number;
    count: number;
  };
}

// 핑계 생성 요청 타입
export interface ExcuseGenerateRequest {
  situation: string;
  target: string;
  tone: string;
  isRegenerated: boolean;
  regeneratedBtnVal?: string; // 재생성 버튼 값 (구체적으로, 간결하게)
  questions: Array<{
    step: number;
    prompt: string;
    answer: string;
  }>;
}

// 핑계 생성 응답 타입
export interface ExcuseGenerateResponse {
  excuse: {
    situation: string;
    target: string;
    tone: string;
    excuse: string;
    credibilityWhy: string;
    credibilityScore: number;
    category: string;
    keyword: string[];
    alts: string[];
    tokens_used: number;
    response_time_ms: number;
    created_at: string;
  };
  imageKey: string;
  id: number;
}

// 핑계 생성 API
export const generateExcuse = async (
  data: ExcuseGenerateRequest
): Promise<ExcuseGenerateResponse> => {
  const response = await api.post<ExcuseGenerateResponse>(
    "/api/clova/generate",
    data
  );
  return response.data;
};
