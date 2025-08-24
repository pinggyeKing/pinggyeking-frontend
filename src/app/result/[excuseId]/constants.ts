// result 페이지 관련 상수들

export const CHARACTER_IMAGE_MAP: { [key: string]: string } = {
  default: "/characters/default.svg",
  suit: "/characters/suit.svg",
  cute: "/characters/cute.svg",
  kidding: "/characters/kidding.svg",
  cool: "/characters/cool.svg",
};

export const IMAGE_KEY_TO_CHARACTER: { [key: string]: string } = {
  A: "suit",
  B: "default",
  C: "cute",
  D: "kidding",
  E: "cool",
};

export const STORAGE_KEYS = {
  EXCUSE_FORM_DATA: "excuse_form_data",
  EXCUSE_RESULT: "excuse_result",
  CHARACTER_TYPE: "character_type",
  IS_REGENERATION: "is_regeneration",
  REGENERATION_OPTION: "regeneration_option",
} as const;

export const FEEDBACK_MESSAGES = {
  COPY_SUCCESS: "복사되었어요!",
  NO_FORM_DATA: "생성 정보를 찾을 수 없습니다.",
  FEEDBACK_SUBMIT_ERROR: "피드백 전송에 실패했습니다.",
} as const;

export const REGENERATE_OPTIONS = ["구체적으로", "간결하게"] as const;

export const FEEDBACK_CHARACTER_SIZE = {
  width: 287,
  height: 164,
} as const;

export const DEFAULT_CHARACTER_SIZE = {
  width: 112,
  height: 120,
} as const;
