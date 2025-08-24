// 폼 관련 상수 정의
export const PICKER_OPTIONS = {
  TARGET: [
    { label: "상사/선배", value: "상사/선배" },
    { label: "교수/선생님", value: "교수/선생님" },
    { label: "동료/친구", value: "동료/친구" },
    { label: "연인/가족", value: "연인/가족" },
    { label: "기타", value: "기타" },
  ],
  TONE: [
    { label: "정중하게", value: "정중하게" },
    { label: "친근하게", value: "친근하게" },
    { label: "유머러스하게", value: "유머러스하게" },
    { label: "진지하게", value: "진지하게" },
    { label: "알아서 해줘~", value: "알아서 해줘~" },
  ],
} as const;

export const STEP_CONFIG = {
  1: {
    title: "누구에게 핑계를 댈까요?",
    subtitle: "핑계를 말할 상대를 선택해주세요",
    type: "picker" as const,
    options: PICKER_OPTIONS.TARGET,
    progress: 20 as const,
  },
  2: {
    title: "어떤 톤으로 말할까요?",
    subtitle: "핑계의 말투와 느낌을 선택해주세요",
    type: "picker" as const,
    options: PICKER_OPTIONS.TONE,
    progress: 40 as const,
  },
  3: {
    title: "핑계가 필요한 상황을 말해주세요",
    subtitle: "총 3가지 질문이 있을 예정이에요!",
    type: "text" as const,
    balloonText: "안녕하세요!\n구체적으로 어떤 상황인가요?",
    progress: 60 as const,
    required: true,
  },
  4: {
    title: "핑계가 필요한 상황을 말해주세요",
    subtitle: "두번째 질문이에요!",
    type: "text" as const,
    balloonText:
      "추가로 설명하고 싶은 부분이 있나요?\n(상황 설명, 정도나 심각성, 관련 배경 등)",
    progress: 80 as const,
    required: false,
  },
  5: {
    title: "핑계가 필요한 상황을 말해주세요",
    subtitle: "드디어 마지막 질문!",
    type: "text" as const,
    balloonText: "상대방에게 전달할 때 고려해야 할 점이 있나요?",
    progress: 100 as const,
    required: false,
  },
} as const;

export const TOTAL_STEPS = Object.keys(STEP_CONFIG).length;

// localStorage 키 상수
export const STORAGE_KEYS = {
  EXCUSE_FORM_DATA: "excuse_form_data",
  EXCUSE_RESULT: "excuse_result",
  RESULT_LIKE_STATUS: "result_like_status",
  RESULT_REGENERATE_OPTION: "result_regenerate_option",
  CHARACTER_TYPE: "character_type",
  IS_REGENERATION: "is_regeneration",
  REGENERATION_OPTION: "regeneration_option",
} as const;
