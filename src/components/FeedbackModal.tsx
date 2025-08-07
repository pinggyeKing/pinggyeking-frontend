"use client";

import React, { useState } from "react";
import Modal from "./common/Modal/Modal";
import EvalInputBalloon from "./inputs/EvalInputBalloon";
import Image from "next/image";

export type CharacterType =
  | "default"
  | "excited"
  | "kidding"
  | "sad"
  | "cute"
  | "cool"
  | "crown"
  | "suit";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
  onCancel: () => void;
  characterType?: CharacterType;
  placeholder?: string;
}

// 캐릭터 SVG 매핑
const characterMap = {
  default: "/characters/default.svg",
  excited: "/characters/excited.svg",
  kidding: "/characters/kidding.svg",
  sad: "/characters/sad.svg",
  cute: "/characters/cute.svg",
  cool: "/characters/cool.svg",
  crown: "/characters/crown.svg",
  suit: "/characters/suit.svg",
} as const;

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onCancel,
  characterType = "default",
  placeholder = "어떤 점이 만족스럽나요?",
}) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback(""); // 제출 후 초기화
  };

  const handleCancel = () => {
    setFeedback(""); // 취소 시 초기화
    onCancel();
  };

  const handleClose = () => {
    setFeedback(""); // 닫기 시 초기화
    onClose();
  };

  const characterSvgPath = characterMap[characterType];

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      onCancel={handleCancel}
      onConfirm={handleSubmit}
      confirmText="평가 제출하기"
      size="medium"
      showCloseButton={true}
      showBottomButton={true}
    >
      {/* 헤더 */}
      <div className="flex flex-col items-center gap-1 w-full">
        <h2
          className="text-section-title text-grey-10 text-center"
          style={{
            fontFamily: "Ownglyph RDO ballpen, Pretendard, sans-serif",
            fontSize: 26,
            fontWeight: 400,
            lineHeight: "0.923em", // 24px / 26px
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          생성된 핑계는 어땠나요?
        </h2>
        <p
          className="text-grey-10 text-center"
          style={{
            fontFamily: "Ownglyph RDO ballpen, Pretendard, sans-serif",
            fontSize: 18,
            fontWeight: 400,
            lineHeight: "1em",
            textAlign: "center",
          }}
        >
          핑계를 평가해주세요! (선택사항)
        </p>
      </div>

      {/* 메인 콘텐츠 - 캐릭터 + 입력 필드 */}
      <div className="flex flex-col items-center gap-3 w-full flex-1">
        {/* 캐릭터 */}
        <div className="flex justify-center items-center w-full h-[164px]">
          <Image
            src={characterSvgPath}
            alt={`${characterType} character`}
            width={135}
            height={119}
            className="w-auto h-auto max-w-[135px] max-h-[119px]"
          />
        </div>

        {/* 입력 말풍선 */}
        <div className="w-full">
          <EvalInputBalloon
            value={feedback}
            onChange={setFeedback}
            placeholder={placeholder}
            className="w-full"
          />
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackModal;
