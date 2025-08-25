// result 페이지 상호작용 상태 관리 커스텀 훅

import { useState, useEffect } from "react";
import {
  InteractionState,
  LikeStatus,
  RegenerateOption,
  FeedbackSource,
} from "./types";
import {
  getInitialLikeStatus,
  getInitialRegenerateOption,
  saveLikeStatus,
  saveRegenerateOption,
} from "./utils";

export const useResultInteractions = (excuseId: string) => {
  const [state, setState] = useState<InteractionState>({
    likeStatus: "none",
    isRegenerateOpen: false,
    selectedRegenerateOption: null,
    showExitModal: false,
    showFeedbackModal: false,
    feedback: "",
    isFeedbackSubmitting: false,
    feedbackSource: null,
  });

  // 초기값 로드
  useEffect(() => {
    if (excuseId) {
      setState((prev) => ({
        ...prev,
        likeStatus: getInitialLikeStatus(excuseId),
        selectedRegenerateOption: getInitialRegenerateOption(excuseId),
      }));
    }
  }, [excuseId]);

  // localStorage에 상태 저장
  useEffect(() => {
    if (excuseId) {
      saveLikeStatus(excuseId, state.likeStatus);
    }
  }, [state.likeStatus, excuseId]);

  useEffect(() => {
    if (excuseId && state.selectedRegenerateOption) {
      saveRegenerateOption(excuseId, state.selectedRegenerateOption);
    }
  }, [state.selectedRegenerateOption, excuseId]);

  const updateState = (updates: Partial<InteractionState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const setLikeStatus = (status: LikeStatus) => {
    updateState({ likeStatus: status });
  };

  const setRegenerateOpen = (isOpen: boolean) => {
    updateState({ isRegenerateOpen: isOpen });
  };

  const setSelectedRegenerateOption = (option: RegenerateOption | null) => {
    updateState({ selectedRegenerateOption: option });
  };

  const setShowExitModal = (show: boolean) => {
    updateState({ showExitModal: show });
  };

  const setShowFeedbackModal = (show: boolean) => {
    updateState({ showFeedbackModal: show });
  };

  const setFeedback = (feedback: string) => {
    updateState({ feedback });
  };

  const setFeedbackSubmitting = (submitting: boolean) => {
    updateState({ isFeedbackSubmitting: submitting });
  };

  const setFeedbackSource = (source: FeedbackSource | null) => {
    updateState({ feedbackSource: source });
  };

  return {
    ...state,
    setLikeStatus,
    setRegenerateOpen,
    setSelectedRegenerateOption,
    setShowExitModal,
    setShowFeedbackModal,
    setFeedback,
    setFeedbackSubmitting,
    setFeedbackSource,
  };
};
