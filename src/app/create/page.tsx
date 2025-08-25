"use client";

import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";
import Modal from "@/components/common/Modal";
import { useCreateForm } from "./useCreateForm";
import { PickerStep, TextStep, NavigationButtons } from "./components";
import {
  getCurrentStepConfig,
  getFormFieldForStep,
  getFormValueForStep,
} from "./utils";
import { TOTAL_STEPS } from "./constants";

export default function CreatePage() {
  const {
    currentStep,
    formData,
    showExitModal,
    updateFormField,
    canProceed,
    handleNext,
    handlePrevious,
    handleExitConfirm,
    handleExitCancel,
  } = useCreateForm();

  const stepConfig = getCurrentStepConfig(currentStep);
  const currentValue = getFormValueForStep(formData, currentStep);

  const handleStepValueChange = (value: string) => {
    const field = getFormFieldForStep(currentStep);
    if (field) {
      updateFormField(field, value);
    }
  };

  const renderStepContent = () => {
    if (stepConfig.type === "picker" && stepConfig.options) {
      return (
        <PickerStep
          title={stepConfig.title}
          subtitle={stepConfig.subtitle}
          options={[...stepConfig.options]} // readonly 배열을 mutable로 복사
          value={currentValue}
          onChange={handleStepValueChange}
        />
      );
    }

    if (stepConfig.type === "text" && stepConfig.balloonText) {
      return (
        <TextStep
          title={stepConfig.title}
          subtitle={stepConfig.subtitle}
          balloonText={stepConfig.balloonText}
          value={currentValue}
          onChange={handleStepValueChange}
          required={stepConfig.required}
        />
      );
    }

    return null;
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      {/* 메인 카드 */}
      <div className="w-full h-full flex flex-col gap-4 items-center">
        <ProgressBar stage={stepConfig.progress} style="curved" />
        {renderStepContent()}
      </div>

      <NavigationButtons
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        canProceed={canProceed()}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

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
