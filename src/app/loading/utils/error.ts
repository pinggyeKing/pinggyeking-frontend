// 에러 처리 관련 유틸리티 함수들

import { ERROR_MESSAGES } from "../constants";

export const getErrorMessage = (error: any): string => {
  if (error.response) {
    const status = error.response.status;

    if (status === 400) return ERROR_MESSAGES.BAD_REQUEST;
    if (status === 500) return ERROR_MESSAGES.SERVER_ERROR;

    return ERROR_MESSAGES.DEFAULT;
  }

  if (error.request) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  return ERROR_MESSAGES.DEFAULT;
};

export const isAbortError = (error: any): boolean => {
  return error.name === "AbortError";
};

export const logError = (error: any, componentId: string): void => {
  console.error(`❌ 핑계 생성 실패 [${componentId}]:`, error);

  if (error.response) {
    console.error("응답 상태:", error.response.status);
    console.error("응답 데이터:", error.response.data);
  } else if (error.request) {
    console.error("네트워크 오류:", error.request);
  }
};
