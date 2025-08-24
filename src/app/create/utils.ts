import { FormData, StepNumber } from "./types";
import { STEP_CONFIG } from "./constants";

export const getCurrentStepConfig = (step: StepNumber) => {
  return STEP_CONFIG[step];
};

export const getFormFieldForStep = (
  step: StepNumber
): keyof FormData | null => {
  switch (step) {
    case 1:
      return "target";
    case 2:
      return "tone";
    case 3:
      return "situation";
    case 4:
      return "additionalInfo";
    case 5:
      return "considerations";
    default:
      return null;
  }
};

export const getFormValueForStep = (
  formData: FormData,
  step: StepNumber
): string => {
  const field = getFormFieldForStep(step);
  return field ? formData[field] : "";
};
