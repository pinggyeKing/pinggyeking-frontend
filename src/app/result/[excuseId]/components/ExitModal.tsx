// 홈으로 이동 확인 모달 컴포넌트

import Modal from "@/components/common/Modal";
import Image from "next/image";

interface ExitModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ExitModal({
  open,
  onConfirm,
  onCancel,
}: ExitModalProps) {
  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onCancel}
      onCancel={onCancel}
      onConfirm={onConfirm}
      confirmText="확인"
      size="small"
      showCloseButton={false}
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-section-title text-grey-10 text-center">
            홈으로 이동하시겠습니까?
          </p>
          <p className="text-section-subtitle text-grey-10 text-center">
            생성된 핑계를 다시 볼 수 없습니다.
          </p>
        </div>
        <Image
          src="/characters/Error.svg"
          alt="처음으로 돌아갈까?"
          width={287}
          height={164}
        />
      </div>
    </Modal>
  );
}
