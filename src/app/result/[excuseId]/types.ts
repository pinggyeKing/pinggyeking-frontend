// result 페이지 관련 타입 정의

import { ExcuseGenerateResponse } from "@/lib/api";

export type LikeStatus = "none" | "like" | "dislike";

export type RegenerateOption = "구체적으로" | "간결하게";

export type FeedbackSource = "create-image" | "reaction";

export interface ResultPageParams {
  excuseId: string;
}

export interface ResultState {
  resultText: string;
  characterType: string;
  excuseData: ExcuseGenerateResponse | null;
  isLoading: boolean;
}

export interface InteractionState {
  likeStatus: LikeStatus;
  isRegenerateOpen: boolean;
  selectedRegenerateOption: RegenerateOption | null;
  showExitModal: boolean;
  showFeedbackModal: boolean;
  feedback: string;
  isFeedbackSubmitting: boolean;
  feedbackSource: FeedbackSource | null;
}
