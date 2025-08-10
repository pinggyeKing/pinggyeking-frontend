import axios from "axios";

// Mixed Content 방지를 위한 baseURL 결정 로직
// 개발 환경(dev): 직접 백엔드 주소(HTTP) 사용 (env에서 설정)
// 프로덕션(prod): 상대경로 사용 -> Next.js rewrites 가 서버 사이드에서 백엔드로 프록시 (브라우저에는 항상 HTTPS 상대 경로만 노출)
function resolveBaseURL() {
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (process.env.NODE_ENV === "development") {
    // 로컬 개발 시 직접 접근 (http 사용 가능)
    return envUrl || "http://49.50.133.127:8080";
  }
  // 프로덕션에서는 절대 http:// 호출을 피하고, 상대 경로 사용
  return ""; // '' 또는 '/' 모두 가능. '' 로 두면 요청 시 전달한 경로 그대로 사용.
}

const baseURL = resolveBaseURL();

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

if (typeof window !== "undefined") {
  // 디버깅용 (필요시 제거 가능)
  // console.log("[API] baseURL=", baseURL || "<relative>", "env=", process.env.NODE_ENV);
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
