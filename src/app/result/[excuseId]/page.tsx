"use client";

import React, { use } from "react";
import CustomButton from "@/components/Custombutton";
import Balloon from "@/components/inputs/Balloon";
import ResultHeader from "./components/ResultHeader";
import ActionButtons from "./components/ActionButtons";
import ExitModal from "./components/ExitModal";
import FeedbackModal from "./components/FeedbackModal";
import { useResultData } from "./useResultData";
import { useResultInteractions } from "./useResultInteractions";
import { useResultActions } from "./useResultActions";

interface ResultPageProps {
  params: Promise<{
    excuseId: string;
  }>;
}

export default function ResultPage({ params }: ResultPageProps) {
  const resolvedParams = use(params);
  const excuseId = resolvedParams.excuseId;

  // 데이터 로딩
  const { resultText, characterType, isLoading } = useResultData(excuseId);

  // 상호작용 상태 관리
  const interactions = useResultInteractions(excuseId);

  // 액션 핸들러들
  const actions = useResultActions({
    excuseId,
    resultText,
    likeStatus: interactions.likeStatus,
    feedback: interactions.feedback,
    feedbackSource: interactions.feedbackSource,
    setLikeStatus: interactions.setLikeStatus,
    setRegenerateOpen: interactions.setRegenerateOpen,
    setSelectedRegenerateOption: interactions.setSelectedRegenerateOption,
    setShowExitModal: interactions.setShowExitModal,
    setShowFeedbackModal: interactions.setShowFeedbackModal,
    setFeedback: interactions.setFeedback,
    setFeedbackSubmitting: interactions.setFeedbackSubmitting,
    setFeedbackSource: interactions.setFeedbackSource,
  });

  // 로딩 중이면 로딩 표시
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-section-title text-grey-10">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* 상단 헤더 */}
      <ResultHeader
        characterType={characterType}
        onGoHome={actions.handleGoHome}
      />

      {/* 결과 텍스트 영역 */}
      <div className="flex-1 flex flex-col gap-3">
        {/* 결과 말풍선 */}
        <div className="w-full h-full mt-4">
          <Balloon text={resultText} />
        </div>

        {/* 평가 및 액션 버튼들 */}
        <ActionButtons
          likeStatus={interactions.likeStatus}
          isRegenerateOpen={interactions.isRegenerateOpen}
          selectedRegenerateOption={interactions.selectedRegenerateOption}
          onThumbsUp={actions.handleThumbsUp}
          onThumbsDown={actions.handleThumbsDown}
          onCopyText={actions.handleCopyText}
          onRegenerate={actions.handleRegenerate}
          onRegenerateOption={actions.handleRegenerateOption}
        />
      </div>

      {/* 하단 이미지 만들기 버튼 */}
      <div className="w-full px-2">
        <CustomButton
          typeStyle="primary"
          size="large"
          round="square"
          onClick={actions.handleCreateImage}
        >
          이미지 만들기
        </CustomButton>
      </div>

      {/* 홈으로 이동 확인 모달 */}
      <ExitModal
        open={interactions.showExitModal}
        onConfirm={actions.handleExitConfirm}
        onCancel={actions.handleExitCancel}
      />

      {/* 피드백 모달 */}
      <FeedbackModal
        open={interactions.showFeedbackModal}
        feedback={interactions.feedback}
        isFeedbackSubmitting={interactions.isFeedbackSubmitting}
        onFeedbackChange={interactions.setFeedback}
        onConfirm={actions.handleFeedbackConfirm}
        onCancel={actions.handleFeedbackCancel}
      />
    </div>
  );
}
