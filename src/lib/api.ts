import axios from "axios";

// API 기본 설정
export const api = axios.create({
  baseURL: "http://49.50.133.127:8080",
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
  },
);

// API 응답 타입 정의
export interface ExcuseDetailResponse {
  excuse: {
    situation: string;
    target: string;
    tone: string;
    excuse: string;
  };
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
