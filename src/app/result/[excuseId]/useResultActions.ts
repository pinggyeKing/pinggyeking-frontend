// result 페이지 액션 처리 커스텀 훅

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/common/Toast";
import {
  LikeStatus,
  RegenerateOption,
  FeedbackSource,
  ExitTarget,
} from "./types";
import {
  copyToClipboard,
  clearAllResultData,
  validateFormData,
  setRegenerationData,
  submitUserFeedback,
} from "./utils";
import { FEEDBACK_MESSAGES } from "./constants";

interface UseResultActionsProps {
  excuseId: string;
  resultText: string;
  likeStatus: LikeStatus;
  feedback: string;
  feedbackSource: FeedbackSource | null;

  setLikeStatus: (status: LikeStatus) => void;
  setRegenerateOpen: (open: boolean) => void;
  toggleRegenerateOpen: () => void;
  setSelectedRegenerateOption: (option: RegenerateOption | null) => void;
  setShowExitModal: (show: boolean) => void;
  setShowFeedbackModal: (show: boolean) => void;
  setFeedback: (feedback: string) => void;
  setFeedbackSubmitting: (submitting: boolean) => void;
  setFeedbackSource: (source: FeedbackSource | null) => void;
}

export const useResultActions = ({
  excuseId,
  resultText,
  likeStatus,
  feedback,
  feedbackSource,
  setLikeStatus,
  setRegenerateOpen,
  toggleRegenerateOpen,
  setSelectedRegenerateOption,
  setShowExitModal,
  setShowFeedbackModal,
  setFeedback,
  setFeedbackSubmitting,
  setFeedbackSource,
}: UseResultActionsProps) => {
  const router = useRouter();
  const { showInfoToast } = useToast();

  // exitTarget을 내부 상태로 관리
  const [exitTarget, setExitTarget] = useState<ExitTarget | null>(null);

  const handleGoHome = () => {
    setExitTarget("home");
    setShowExitModal(true);
  };

  const handleGoGallery = () => {
    setExitTarget("gallery");
    setShowExitModal(true);
  };

  const handleExitConfirm = () => {
    clearAllResultData(excuseId);

    if (exitTarget === "gallery") {
      router.push("/gallery");
    } else {
      router.push("/");
    }
  };

  const handleExitCancel = () => {
    setShowExitModal(false);
    setExitTarget(null);
  };

  const handleCopyText = async () => {
    const success = await copyToClipboard(resultText);
    if (success) {
      showInfoToast(FEEDBACK_MESSAGES.COPY_SUCCESS);
    }
  };

  const handleRegenerate = () => {
    toggleRegenerateOpen();
  };

  const handleRegenerateOption = async (option: RegenerateOption) => {
    setSelectedRegenerateOption(option);
    setRegenerateOpen(false);

    if (!validateFormData()) {
      showInfoToast(FEEDBACK_MESSAGES.NO_FORM_DATA);
      return;
    }

    setRegenerationData(option);
    router.push("/loading");
  };

  const handleCreateImage = () => {
    router.push(`/result/${excuseId}/create-image`);
  };

  const handleThumbsUp = () => {
    const newStatus = likeStatus === "like" ? "none" : "like";
    setLikeStatus(newStatus);

    if (newStatus === "like") {
      setFeedbackSource("reaction");
      setShowFeedbackModal(true);
    }
  };

  const handleThumbsDown = () => {
    const newStatus = likeStatus === "dislike" ? "none" : "dislike";
    setLikeStatus(newStatus);

    if (newStatus === "dislike") {
      setFeedbackSource("reaction");
      setShowFeedbackModal(true);
    }
  };

  const handleFeedbackConfirm = async () => {
    setFeedbackSubmitting(true);

    try {
      // 상태가 none인 경우 기본적으로 LIKE로 설정
      let finalLikeStatus = likeStatus;
      if (likeStatus === "none") {
        finalLikeStatus = "like";
        setLikeStatus("like");
      }

      await submitUserFeedback(finalLikeStatus, feedback);

      setShowFeedbackModal(false);
      setFeedback("");
      handleCreateImage();
    } catch (error: any) {
      console.error("피드백 전송 실패:", error);

      const errorMessage =
        error.response?.data?.message ||
        FEEDBACK_MESSAGES.FEEDBACK_SUBMIT_ERROR;
      showInfoToast(errorMessage);
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  const handleFeedbackCancel = () => {
    setShowFeedbackModal(false);

    if (feedbackSource === "create-image") {
      handleCreateImage();
    }

    setFeedbackSource(null);
  };

  return {
    handleGoHome,
    handleGoGallery,
    handleExitConfirm,
    handleExitCancel,
    handleCopyText,
    handleRegenerate,
    handleRegenerateOption,
    handleCreateImage,
    handleThumbsUp,
    handleThumbsDown,
    handleFeedbackConfirm,
    handleFeedbackCancel,
    exitTarget, // exitTarget을 반환값에 추가
  };
};
