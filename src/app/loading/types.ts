// 로딩 페이지 관련 타입 정의

export interface FormData {
  situation: string;
  target: string;
  tone: string;
  additionalInfo?: string;
  considerations?: string;
}

export interface ExistingResult {
  id?: string;
  imageKey?: string;
}

export interface LoadingState {
  isApiInProgress: boolean;
  componentId: string;
  isAborted: boolean;
}

export interface ApiCallParams {
  formData: FormData;
  isRegeneration: boolean;
  regenerationOption: string;
  componentId: string;
  abortController: AbortController;
}
