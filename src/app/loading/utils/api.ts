// API 관련 유틸리티 함수들

import { TARGET_OPTIONS, TONE_OPTIONS } from "../constants";
import type { FormData } from "../types";
import { ExcuseGenerateRequest } from "@/lib/api";

export const getTargetLabel = (value: string): string => {
  const option = TARGET_OPTIONS.find((opt) => opt.value === value);
  return option ? option.label : value;
};

export const getToneLabel = (value: string): string => {
  const option = TONE_OPTIONS.find((opt) => opt.value === value);
  return option ? option.label : value;
};

export const buildApiRequest = (
  formData: FormData,
  regenerationOption: string
): ExcuseGenerateRequest => {
  return {
    situation: formData.situation,
    target: getTargetLabel(formData.target),
    tone: getToneLabel(formData.tone),
    // TODO 임시 조치 true
    isRegenerated: true,
    regeneratedBtnVal: regenerationOption,
    questions: [
      {
        step: 1,
        prompt: "구체적으로 어떤 상황이신가요?",
        answer: formData.situation,
      },
      {
        step: 2,
        prompt:
          "추가로 설명하고 싶은 부분이 있나요? (상황 설명, 정도나 심각성, 관련 배경 등)",
        answer: formData.additionalInfo || "",
      },
      {
        step: 3,
        prompt: "상대방에게 전달할 때 고려해야 할 점이 있나요?",
        answer: formData.considerations || "",
      },
    ],
  };
};
