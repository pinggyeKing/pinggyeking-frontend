// 캐릭터 및 UI 관련 유틸리티 함수들

import { CHARACTER_IMAGE_MAP } from "../constants";

export const getCharacterImage = (type: string): string => {
  return CHARACTER_IMAGE_MAP[type] || CHARACTER_IMAGE_MAP.default;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("클립보드 복사 실패:", error);
    return false;
  }
};

export const validateFeedback = (feedback: string): boolean => {
  return feedback.length <= 1000;
};

export const getFeedbackCharacterCount = (feedback: string): string => {
  return `${feedback.length}/1000`;
};

export const isOverFeedbackLimit = (feedback: string): boolean => {
  return feedback.length > 1000;
};
