// localStorage 관련 유틸리티 함수들

import { STORAGE_KEYS, IMAGE_KEY_TO_CHARACTER } from "../constants";
import type { FormData, ExistingResult } from "../types";

export const getFormDataFromStorage = (): FormData | null => {
  try {
    const savedFormData = localStorage.getItem(STORAGE_KEYS.FORM_DATA);
    if (!savedFormData) return null;
    return JSON.parse(savedFormData);
  } catch (error) {
    console.error("폼 데이터 파싱 오류:", error);
    return null;
  }
};

export const getExistingResult = (): ExistingResult | null => {
  try {
    const existingResult = localStorage.getItem(STORAGE_KEYS.EXCUSE_RESULT);
    if (!existingResult) return null;
    return JSON.parse(existingResult);
  } catch (error) {
    console.error("기존 결과 파싱 오류:", error);
    return null;
  }
};

export const isRegenerationMode = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.IS_REGENERATION) === "true";
};

export const getRegenerationOption = (): string => {
  return localStorage.getItem(STORAGE_KEYS.REGENERATION_OPTION) || "";
};

export const saveExcuseResult = (result: any): void => {
  localStorage.setItem(STORAGE_KEYS.EXCUSE_RESULT, JSON.stringify(result));
};

export const saveCharacterType = (imageKey: string): void => {
  const characterType = IMAGE_KEY_TO_CHARACTER[imageKey] || "default";
  localStorage.setItem(STORAGE_KEYS.CHARACTER_TYPE, characterType);
};

export const clearRegenerationData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.IS_REGENERATION);
  localStorage.removeItem(STORAGE_KEYS.REGENERATION_OPTION);
};

export const getResultPageUrl = (result: ExistingResult): string => {
  return result.id ? `/result/${result.id}` : "/result";
};
