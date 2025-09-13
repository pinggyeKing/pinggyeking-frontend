// 피드백 모달 컴포넌트

import Modal from "@/components/common/Modal";
import FigmaTextBox from "@/components/FigmaTextBox";
import Image from "next/image";
import { getFeedbackCharacterCount, isOverFeedbackLimit } from "../utils";
import { FEEDBACK_CHARACTER_SIZE } from "../constants";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { LikeStatus } from "../types";

interface FeedbackModalProps {
  open: boolean;
  likeStatus: LikeStatus;
  feedback: string;
  isFeedbackSubmitting: boolean;
  onFeedbackChange: (feedback: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function FeedbackModal({
  open,
  likeStatus,
  feedback,
  isFeedbackSubmitting,
  onFeedbackChange,
  onConfirm,
  onCancel,
}: FeedbackModalProps) {
  // 모달이 열릴 때 body scroll 방지
  useBodyScrollLock(open);

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onCancel}
      onCancel={onCancel}
      onConfirm={onConfirm}
      confirmText={isFeedbackSubmitting ? "전송 중..." : "평가 제출하기"}
      size="small"
      showCloseButton={true}
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-section-title text-grey-10 text-center">
            생성된 핑계는 어땠나요?
          </p>
          <p className="text-section-subtitle text-grey-10 text-center">
            핑계를 평가해주세요! (선택사항)
          </p>
        </div>
        <Image
          src="/characters/default.svg"
          alt="피드백 캐릭터"
          width={FEEDBACK_CHARACTER_SIZE.width}
          height={FEEDBACK_CHARACTER_SIZE.height}
          className="pt-[41px] pr-[80.725px] pb-[4.295px] pl-[71px]"
        />
        <div className="w-full">
          <FigmaTextBox
            value={feedback}
            multiline={true}
            placeholder={
              likeStatus === "like"
                ? "어떤 점이 만족스럽나요? (최대 1000자)"
                : "어떤 점이 아쉬웠나요? (최대 1000자)"
            }
            editable={!isFeedbackSubmitting}
            onChange={onFeedbackChange}
          />
          <div className="flex justify-end mt-1">
            <span
              className={`text-sm ${
                isOverFeedbackLimit(feedback) ? "text-red-500" : "text-grey-6"
              }`}
            >
              {getFeedbackCharacterCount(feedback)}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
