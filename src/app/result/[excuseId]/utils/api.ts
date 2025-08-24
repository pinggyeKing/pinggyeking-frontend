// API 및 피드백 관련 유틸리티 함수들

import { submitFeedback, FeedbackRequest } from "@/lib/api";
import { LikeStatus } from "../types";

export const getRatingFromLikeStatus = (
  likeStatus: LikeStatus
): "LIKE" | "DISLIKE" => {
  return likeStatus === "dislike" ? "DISLIKE" : "LIKE";
};

export const submitUserFeedback = async (
  likeStatus: LikeStatus,
  feedback: string
): Promise<void> => {
  const rating = getRatingFromLikeStatus(likeStatus);

  const feedbackRequest: FeedbackRequest = {
    rating,
    feedback: feedback.trim(),
  };

  await submitFeedback(feedbackRequest);
};

export const validateFormData = (): boolean => {
  if (typeof window === "undefined") return false;

  const savedFormData = localStorage.getItem("excuse_form_data");
  return !!savedFormData;
};
