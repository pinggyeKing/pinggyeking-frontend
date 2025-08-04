export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "large" | "medium" | "small";
  applyText?: string;
  onApply?: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
  showFooter?: boolean;
  closeOnOverlayClick?: boolean;
}

export interface ModalSize {
  width: number;
  minHeight: number;
}
