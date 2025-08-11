import axios from "axios";

// API 클라이언트 설정 - 직접 HTTPS 엔드포인트 사용
function resolveBaseURL() {
  // 환경변수에서 API URL 가져오기 (개발/프로덕션 모두)
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (envUrl) {
    console.log("[API Client] 환경변수 사용:", envUrl);
    return envUrl;
  }

  // fallback (개발환경용)
  const fallbackUrl = "http://49.50.133.127:8443";
  console.log("[API Client] Fallback 사용:", fallbackUrl);
  return fallbackUrl;
}
const baseURL = resolveBaseURL();

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 디버깅용 로그
if (typeof window !== "undefined") {
  console.log(
    "[API Client] baseURL:",
    baseURL || "<relative>",
    "env:",
    process.env.NODE_ENV
  );
}

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

// 피드백 요청 타입
export interface FeedbackRequest {
  rating: "LIKE" | "DISLIKE";
  feedback: string;
}

// 피드백 에러 응답 타입
export interface FeedbackErrorResponse {
  status: number;
  code: string;
  message: string;
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

// 피드백 전송 API
export const submitFeedback = async (data: FeedbackRequest): Promise<void> => {
  const response = await api.post<void>("/api/feedback", data);
  return response.data;
};
