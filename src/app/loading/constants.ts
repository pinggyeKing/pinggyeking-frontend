// 로딩 페이지 관련 상수들

export const API_CALL_FLAG = "excuse_api_in_progress";

export const LOADING_TEXTS = ["핑계를 생성중이에요!"];

export const LOADING_TEXT_INTERVAL = 2000;

export const NAVIGATION_DELAY = 500;

export const TARGET_OPTIONS = [
  { label: "상사/선배", value: "상사/선배" },
  { label: "교수/선생님", value: "교수/선생님" },
  { label: "동료/친구", value: "동료/친구" },
  { label: "연인/가족", value: "연인/가족" },
  { label: "기타", value: "기타" },
];

export const TONE_OPTIONS = [
  { label: "정중하게", value: "정중하게" },
  { label: "친근하게", value: "친근하게" },
  { label: "유머러스하게", value: "유머러스하게" },
  { label: "진지하게", value: "진지하게" },
  { label: "알아서 해줘~", value: "알아서 해줘~" },
];

export const IMAGE_KEY_TO_CHARACTER: { [key: string]: string } = {
  A: "suit",
  B: "default",
  C: "cute",
  D: "kidding",
  E: "cool",
};

export const ERROR_MESSAGES = {
  DEFAULT: "핑계 생성에 실패했습니다. 다시 시도해주세요.",
  BAD_REQUEST: "요청 데이터가 올바르지 않습니다.",
  SERVER_ERROR: "서버 오류가 발생했습니다.",
  NETWORK_ERROR: "네트워크 연결을 확인해주세요.",
  NO_FORM_DATA: "생성 정보를 찾을 수 없습니다.",
} as const;

export const STORAGE_KEYS = {
  FORM_DATA: "excuse_form_data",
  EXCUSE_RESULT: "excuse_result",
  IS_REGENERATION: "is_regeneration",
  REGENERATION_OPTION: "regeneration_option",
  CHARACTER_TYPE: "character_type",
} as const;
