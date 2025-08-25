// result 페이지 액션 핸들러들을 관리하는 커스텀 훅

import { useRouter } from "next/navigation";
import { useToast } from "@/components/common/Toast";
import { LikeStatus, RegenerateOption, FeedbackSource } from "./types";
import {
  copyToClipboard,
  clearAllResultData,
  setRegenerationData,
  validateFormData,
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
  setRegenerateOpen: (isOpen: boolean) => void;
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
  setSelectedRegenerateOption,
  setShowExitModal,
  setShowFeedbackModal,
  setFeedback,
  setFeedbackSubmitting,
  setFeedbackSource,
}: UseResultActionsProps) => {
  const router = useRouter();
  const { showInfoToast } = useToast();

  const handleGoHome = () => {
    setShowExitModal(true);
  };

  const handleExitConfirm = () => {
    clearAllResultData(excuseId);
    router.push("/");
  };

  const handleExitCancel = () => {
    setShowExitModal(false);
  };

  const handleCopyText = async () => {
    const success = await copyToClipboard(resultText);
    if (success) {
      showInfoToast(FEEDBACK_MESSAGES.COPY_SUCCESS);
    }
  };

  const handleRegenerate = () => {
    setRegenerateOpen(true);
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
  };
};
