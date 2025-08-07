"use client";

import React, { useState } from "react";
import FeedbackModal from "../FeedbackModal";

const TestFeedbackModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<
    | "default"
    | "excited"
    | "kidding"
    | "sad"
    | "cute"
    | "cool"
    | "crown"
    | "suit"
  >("default");

  const handleSubmit = (feedback: string) => {
    console.log("피드백 제출:", feedback);
    alert(`피드백이 제출되었습니다: "${feedback}"`);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log("모달 취소");
    setIsModalOpen(false);
  };

  const handleClose = () => {
    console.log("모달 닫기");
    setIsModalOpen(false);
  };

  const characterOptions = [
    "default",
    "excited",
    "kidding",
    "sad",
    "cute",
    "cool",
    "crown",
    "suit",
  ] as const;

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">FeedbackModal 테스트</h1>

      {/* 캐릭터 선택 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">캐릭터 선택:</label>
        <select
          value={selectedCharacter}
          onChange={(e) =>
            setSelectedCharacter(e.target.value as typeof selectedCharacter)
          }
          className="border border-gray-300 rounded px-3 py-1"
        >
          {characterOptions.map((char) => (
            <option key={char} value={char}>
              {char}
            </option>
          ))}
        </select>
      </div>

      {/* 모달 열기 버튼 */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        평가 모달 열기
      </button>

      {/* FeedbackModal */}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        characterType={selectedCharacter}
        placeholder="어떤 점이 만족스럽나요?"
      />
    </div>
  );
};

export default TestFeedbackModal;
