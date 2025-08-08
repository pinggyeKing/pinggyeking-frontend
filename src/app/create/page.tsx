"use client";

import CustomButton from "@/components/Custombutton";
import Picker from "@/components/picker/Picker";
import ProgressBar from "@/components/ProgressBar";
import FigmaTextBox from "@/components/FigmaTextBox";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/common/Modal";
import Balloon from "@/components/inputs/Balloon";

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
  const [textInput3, setTextInput3] = useState<string>("");
  const [textInput4, setTextInput4] = useState<string>("");
  const [textInput5, setTextInput5] = useState<string>("");
  const [showExitModal, setShowExitModal] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep === 1 && selectedValue1) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedValue2) {
      setCurrentStep(3);
    } else if (currentStep === 3 && textInput3.trim()) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setCurrentStep(5);
    } else if (currentStep === 5) {
      // 완료 처리 - 로딩 페이지로 먼저 이동
      console.log("모든 선택 완료:", {
        relation: selectedValue1,
        tone: selectedValue2,
        situation: textInput3,
        reason: textInput4,
        additionalInfo: textInput5,
      });
      router.push("/loading");
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
    if (currentStep === 3) return textInput3.trim().length > 0;
    if (currentStep === 4) return true; // textInput4 is optional
    if (currentStep === 5) return true; // textInput5 is optional
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
    switch (currentStep) {
      case 1:
        return "누구에게 핑계를 댈까요?";
      case 2:
        return "어떤 톤으로 말할까요?";
      case 3:
        return "핑계가 필요한 상황을 말해주세요";
      case 4:
        return "핑계가 필요한 상황을 말해주세요";
      case 5:
        return "핑계가 필요한 상황을 말해주세요";
      default:
        return "";
    }
  };

  const getCurrentSubtitle = () => {
    switch (currentStep) {
      case 1:
        return "핑계를 말할 상대를 선택해주세요";
      case 2:
        return "핑계의 말투와 느낌을 선택해주세요";
      case 3:
        return "총 3가지 질문이 있을 예정이에요!";
      case 4:
        return "두번째 질문이에요!";
      case 5:
        return "드디어 마지막 질문!";
      default:
        return "";
    }
  };

  const getPinggyekingText = () => {
    switch (currentStep) {
      case 3:
        return "안녕하세요!\n구체적으로 어떤 상황인가요?";
      case 4:
        return "추가로 설명하고 싶은 부분이 있나요?\n(상황 설명, 정도나 심각성, 관련 배경 등)";
      case 5:
        return "상대방에게 전달할 때 고려해야 할 점이 있나요?";
      default:
        return "";
    }
  };

  const getProgressStage = (): 20 | 40 | 60 | 80 | 100 => {
    switch (currentStep) {
      case 1:
        return 20;
      case 2:
        return 40;
      case 3:
        return 60;
      case 4:
        return 80;
      case 5:
        return 100;
      default:
        return 20;
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      {/* 메인 카드 */}
      <div className="w-full h-full flex flex-col gap-4 items-center">
        <ProgressBar stage={getProgressStage()} style="curved" />

        {/* 1, 2단계: 선택형 */}
        {(currentStep === 1 || currentStep === 2) && (
          <div className="w-full h-full flex flex-col gap-[10px]">
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
        )}

        {/* 3, 4, 5단계: 텍스트 입력형 */}
        {(currentStep === 3 || currentStep === 4 || currentStep === 5) && (
          <div className="w-full h-full flex flex-col gap-[10px]">
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

            {/* 도움말 말풍선 (상대방) */}
            <div className="w-full flex justify-center">
              <Balloon text={getPinggyekingText()} />
            </div>

            {/* 사용자 입력 말풍선 */}
            <div className="w-full h-full flex justify-center">
              <FigmaTextBox
                value={
                  currentStep === 3
                    ? textInput3
                    : currentStep === 4
                    ? textInput4
                    : textInput5
                }
                multiline={true}
                editable={true}
                onChange={(value: string) => {
                  if (currentStep === 3) setTextInput3(value);
                  else if (currentStep === 4) setTextInput4(value);
                  else if (currentStep === 5) setTextInput5(value);
                }}
                status={
                  (
                    currentStep === 3
                      ? textInput3.trim()
                      : currentStep === 4
                      ? textInput4.trim()
                      : textInput5.trim()
                  )
                    ? "inputed"
                    : "default"
                }
              />
            </div>
          </div>
        )}
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
            {currentStep === 5 ? "완료" : "다음"}
          </CustomButton>
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
          showCloseButton={false}
        >
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-section-title text-grey-10 text-center">
              홈으로 이동할까요?
            </p>
            <Image
              src="/characters/default.svg"
              alt="기본 캐릭터"
              width={287}
              height={164}
              className="pt-[41px] pr-[80.725px] pb-[4.295px] pl-[71px]"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
