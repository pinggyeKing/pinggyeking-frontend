"use client";

import CustomButton from "@/components/Custombutton";
import Picker from "@/components/picker/Picker";
import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/common/Modal";

export default function Page() {
  const pickerOptions1 = [
    { label: "상사/선배", value: "boss" },
    { label: "교수/선생님", value: "teacher" },
    { label: "동료/친구", value: "colleague" },
    { label: "연인/가족", value: "lover" },
    { label: "기타", value: "other" },
  ];
  const pickerOptions2 = [
    { label: "정중하게", value: "polite" },
    { label: "친근하게", value: "friendly" },
    { label: "유머러스하게", value: "humorous" },
    { label: "진지하게", value: "serious" },
    { label: "알아서 해줘~", value: "casual" },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedValue1, setSelectedValue1] = useState<string>("");
  const [selectedValue2, setSelectedValue2] = useState<string>("");
  const [showExitModal, setShowExitModal] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep === 1 && selectedValue1) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedValue2) {
      // 완료 처리 - result 페이지로 이동
      console.log("선택 완료:", {
        relation: selectedValue1,
        tone: selectedValue2,
      });
      router.push("/result");
    }
  };

  const handlePrevious = () => {
    if (currentStep === 1) {
      setShowExitModal(true);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return !!selectedValue1;
    if (currentStep === 2) return !!selectedValue2;
    return false;
  };

  const getCurrentOptions = () => {
    return currentStep === 1 ? pickerOptions1 : pickerOptions2;
  };

  const handleExitConfirm = () => {
    router.push("/");
  };

  const handleExitCancel = () => {
    setShowExitModal(false);
  };

  const getCurrentValue = () => {
    return currentStep === 1 ? selectedValue1 : selectedValue2;
  };

  const getCurrentOnChange = () => {
    return currentStep === 1 ? setSelectedValue1 : setSelectedValue2;
  };

  const getCurrentTitle = () => {
    return currentStep === 1
      ? "누구에게 핑계를 댈까요?"
      : "어떤 톤으로 말할까요?";
  };

  const getCurrentSubtitle = () => {
    return currentStep === 1
      ? "핑계를 말할 상대를 선택해주세요"
      : "핑계의 말투와 느낌을 선택해주세요";
  };
  return (
    <div className="flex flex-col items-center pt-[65px] min-h-screen">
      {/* 로고 타이틀 */}
      <div className="text-extra-title text-grey-8 text-center leading-[68px] mb-[51px]">
        변명연구소
      </div>
      {/* 메인 카드 */}
      <div className="w-[400px] h-[726px] radius-24 flex flex-col items-center gap-5 px-5 pt-5 pb-10 border-2 border-grey-7 bg-grey-0">
        <div className="flex flex-col gap-4 items-center">
          <ProgressBar stage={currentStep === 1 ? 20 : 40} style="curved" />
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-1">
              <p className="text-section-title text-grey-10 text-center">
                {getCurrentTitle()}
              </p>
              <p className="text-section-subtitle text-grey-10 text-center">
                {getCurrentSubtitle()}
              </p>
            </div>
            <div className="flex justify-center items-center w-full">
              <Image
                src="/characters/default.svg"
                alt="기본 캐릭터"
                width={135}
                height={119}
              />
            </div>
            <Picker
              options={getCurrentOptions()}
              value={getCurrentValue()}
              onChange={getCurrentOnChange()}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-between px-5">
          <div className="w-[80px] h-[48px]">
            <CustomButton
              typeStyle="outline2"
              round="square"
              onClick={handlePrevious}
            >
              이전
            </CustomButton>
          </div>
          <div className="w-[80px] h-[48px]">
            <CustomButton
              typeStyle={canProceed() ? "primary" : "disable"}
              round="square"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {currentStep === 2 ? "완료" : "다음"}
            </CustomButton>
          </div>
        </div>
      </div>

      {showExitModal && (
        <Modal
          open={showExitModal}
          onClose={handleExitCancel}
          onCancel={handleExitCancel}
          onConfirm={handleExitConfirm}
          confirmText="확인"
          size="small"
        >
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-section-title text-grey-10 text-center">
              홈으로 이동할까요?
            </p>
            <Image
              src="/characters/default.svg"
              alt="기본 캐릭터"
              width={360}
              height={164}
              className="pt-[41px] pr-[117.73px] pb-[4.29px] pl-[107px]"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
