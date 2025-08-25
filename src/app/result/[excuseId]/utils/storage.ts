// localStorage 관련 유틸리티 함수들

import { STORAGE_KEYS, IMAGE_KEY_TO_CHARACTER } from "../constants";
import { LikeStatus, RegenerateOption } from "../types";
import { ExcuseGenerateResponse } from "@/lib/api";

export const getStorageKey = {
  likeStatus: (excuseId: string) => `result_like_status_${excuseId}`,
  regenerateOption: (excuseId: string) =>
    `result_regenerate_option_${excuseId}`,
};

export const getInitialLikeStatus = (excuseId: string): LikeStatus => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(getStorageKey.likeStatus(excuseId));
    return saved ? (saved as LikeStatus) : "none";
  }
  return "none";
};

export const getInitialRegenerateOption = (
  excuseId: string
): RegenerateOption | null => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(
      getStorageKey.regenerateOption(excuseId)
    );
    return saved ? (saved as RegenerateOption) : null;
  }
  return null;
};

export const saveLikeStatus = (excuseId: string, status: LikeStatus): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(getStorageKey.likeStatus(excuseId), status);
  }
};

export const saveRegenerateOption = (
  excuseId: string,
  option: RegenerateOption
): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(getStorageKey.regenerateOption(excuseId), option);
  }
};

export const getExcuseResult = (): ExcuseGenerateResponse | null => {
  if (typeof window !== "undefined") {
    const savedResult = localStorage.getItem(STORAGE_KEYS.EXCUSE_RESULT);
    if (savedResult) {
      try {
        return JSON.parse(savedResult) as ExcuseGenerateResponse;
      } catch (error) {
        console.error("결과 데이터 파싱 오류:", error);
      }
    }
  }
  return null;
};

export const getCharacterTypeFromImageKey = (imageKey: string): string => {
  return IMAGE_KEY_TO_CHARACTER[imageKey] || "default";
};

export const setRegenerationData = (option: RegenerateOption): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.IS_REGENERATION, "true");
    localStorage.setItem(STORAGE_KEYS.REGENERATION_OPTION, option);
  }
};

export const clearAllResultData = (excuseId: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEYS.EXCUSE_FORM_DATA);
    localStorage.removeItem(STORAGE_KEYS.EXCUSE_RESULT);
    localStorage.removeItem(getStorageKey.likeStatus(excuseId));
    localStorage.removeItem(getStorageKey.regenerateOption(excuseId));
    localStorage.removeItem(STORAGE_KEYS.CHARACTER_TYPE);
  }
};
