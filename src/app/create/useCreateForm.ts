import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormData, StepNumber } from "./types";
import { STEP_CONFIG, STORAGE_KEYS, TOTAL_STEPS } from "./constants";

export const useCreateForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [formData, setFormData] = useState<FormData>({
    target: "",
    tone: "",
    situation: "",
    additionalInfo: "",
    considerations: "",
  });
  const [showExitModal, setShowExitModal] = useState(false);

  const updateFormField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = (): boolean => {
    const config = STEP_CONFIG[currentStep];

    if (config.type === "picker") {
      if (currentStep === 1) return !!formData.target;
      if (currentStep === 2) return !!formData.tone;
    }

    if (config.type === "text") {
      if (currentStep === 3) return formData.situation.trim().length > 0;
      if (currentStep === 4 || currentStep === 5) return true; // Optional fields
    }

    return false;
  };

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS && canProceed()) {
      setCurrentStep((prev) => (prev + 1) as StepNumber);
    } else if (currentStep === TOTAL_STEPS) {
      await submitForm();
    }
  };

  const handlePrevious = () => {
    if (currentStep === 1) {
      setShowExitModal(true);
    } else {
      setCurrentStep((prev) => (prev - 1) as StepNumber);
    }
  };

  const submitForm = async () => {
    // localStorage에 폼 데이터 저장
    localStorage.setItem(
      STORAGE_KEYS.EXCUSE_FORM_DATA,
      JSON.stringify(formData)
    );

    // 새로운 핑계 생성이므로 기존 결과 및 관련 데이터 삭제
    const keysToRemove = [
      STORAGE_KEYS.EXCUSE_RESULT,
      STORAGE_KEYS.RESULT_LIKE_STATUS,
      STORAGE_KEYS.RESULT_REGENERATE_OPTION,
      STORAGE_KEYS.CHARACTER_TYPE,
      STORAGE_KEYS.IS_REGENERATION,
      STORAGE_KEYS.REGENERATION_OPTION,
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));

    // 로딩 페이지로 이동
    router.push("/loading");
  };

  const handleExitConfirm = () => {
    router.push("/");
  };

  const handleExitCancel = () => {
    setShowExitModal(false);
  };

  return {
    currentStep,
    formData,
    showExitModal,
    updateFormField,
    canProceed,
    handleNext,
    handlePrevious,
    handleExitConfirm,
    handleExitCancel,
  };
};
