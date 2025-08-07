"use client";

import React from "react";
import { useToast } from "@/components/common/Toast";
import CustomButton from "@/components/Custombutton";

const ToastTestPage: React.FC = () => {
  const {
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast,
    showToast,
    clearAllToasts,
  } = useToast();

  const handleSuccessToast = () => {
    showSuccessToast("이미지가 저장되었어요!");
  };

  const handleErrorToast = () => {
    showErrorToast("오류가 발생했습니다!");
  };

  const handleWarningToast = () => {
    showWarningToast("주의가 필요합니다!");
  };

  const handleInfoToast = () => {
    showInfoToast("알림 메시지입니다!");
  };

  const handleCustomToast = () => {
    showToast("커스텀 메시지입니다!", {
      duration: 5000,
    });
  };

  const handleMultipleToasts = () => {
    showSuccessToast("첫 번째 토스트");
    setTimeout(() => showInfoToast("두 번째 토스트"), 500);
    setTimeout(() => showWarningToast("세 번째 토스트"), 1000);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-2xl font-bold mb-6">Toast 컴포넌트 테스트</h1>

      <div className="grid grid-cols-2 gap-4">
        <CustomButton onClick={handleSuccessToast} typeStyle="primary">
          성공 토스트
        </CustomButton>

        <CustomButton onClick={handleErrorToast} typeStyle="outline1">
          에러 토스트
        </CustomButton>

        <CustomButton onClick={handleWarningToast} typeStyle="outline2">
          경고 토스트
        </CustomButton>

        <CustomButton onClick={handleInfoToast} typeStyle="ghost">
          정보 토스트
        </CustomButton>

        <CustomButton onClick={handleCustomToast} typeStyle="primary">
          커스텀 토스트 (5초)
        </CustomButton>

        <CustomButton onClick={handleMultipleToasts} typeStyle="outline1">
          다중 토스트
        </CustomButton>
      </div>

      <div className="mt-8">
        <CustomButton onClick={clearAllToasts} typeStyle="disable">
          모든 토스트 제거
        </CustomButton>
      </div>

      <div className="mt-8 max-w-md text-center">
        <h2 className="text-lg font-semibold mb-2">사용법</h2>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• 각 버튼을 클릭하여 다양한 타입의 토스트를 확인하세요</p>
          <p>• 토스트는 3초 후 자동으로 사라집니다</p>
          <p>• 여러 토스트가 동시에 표시될 수 있습니다</p>
          <p>• 화면 상단 중앙에 나타납니다</p>
        </div>
      </div>
    </div>
  );
};

export default ToastTestPage;
