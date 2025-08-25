// 타입 정의
export type StepNumber = 1 | 2 | 3 | 4 | 5;

export type ProgressStage = 20 | 40 | 60 | 80 | 100;

export interface FormData {
  target: string;
  tone: string;
  situation: string;
  additionalInfo: string;
  considerations: string;
}

export interface PickerOption {
  label: string;
  value: string;
}

export type StepType = "picker" | "text";

export interface StepConfig {
  title: string;
  subtitle: string;
  type: StepType;
  options?: readonly PickerOption[];
  balloonText?: string;
  progress: ProgressStage;
  required?: boolean;
}
