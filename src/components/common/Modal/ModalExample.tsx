"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import CustomButton from "../../Custombutton";

const ModalExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalSize, setModalSize] = useState<"large" | "medium" | "small">(
    "medium",
  );

  const openModal = (size: "large" | "medium" | "small") => {
    setModalSize(size);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleApply = () => {
    console.log("모달 적용 버튼 클릭");
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">모달 컴포넌트 예시</h1>

      <div className="flex gap-4">
        <CustomButton onClick={() => openModal("small")} typeStyle="primary">
          작은 모달 열기
        </CustomButton>
        <CustomButton onClick={() => openModal("medium")} typeStyle="primary">
          중간 모달 열기
        </CustomButton>
        <CustomButton onClick={() => openModal("large")} typeStyle="primary">
          큰 모달 열기
        </CustomButton>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="모달 제목"
        size={modalSize}
        applyText="확인"
        onApply={handleApply}
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            이것은 모달 컴포넌트의 예시입니다. 다양한 크기와 기능을
            테스트해보세요.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">모달 기능:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 배경 클릭 시 닫기</li>
              <li>• ESC 키로 닫기</li>
              <li>• 다양한 크기 옵션</li>
              <li>• 커스터마이징 가능한 버튼 텍스트</li>
              <li>• 스크롤 가능한 컨텐츠</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalExample;
