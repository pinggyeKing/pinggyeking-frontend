export interface ModalProps {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string; // 적용 버튼 텍스트 (기본값: "적용")
  size?: "large" | "medium" | "small";
  children: React.ReactNode;
  showCloseButton?: boolean;
  showBottomButton?: boolean;
}

export interface ModalSize {
  width: number;
  minHeight: number;
}
