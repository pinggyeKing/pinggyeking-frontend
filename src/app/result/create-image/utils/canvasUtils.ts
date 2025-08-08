// Canvas 기반 카드 다운로드 유틸리티 함수들

interface CanvasCardRef {
  getCanvasAsBlob: (type?: string, quality?: number) => Promise<Blob | null>;
  getCanvasAsDataURL: (type?: string, quality?: number) => string;
}

// Canvas 카드를 JPG로 다운로드하는 함수
export const downloadCanvasCardAsJPG = async (
  canvasRef: CanvasCardRef,
  recipient: string = "card",
  cardType: "default" | "formal" | "cute" | "humorous" | "pop" = "default",
  successMessage: string = "카드가 저장되었어요!",
  errorMessage: string = "카드 저장에 실패했습니다.",
): Promise<boolean> => {
  try {
    // 파일명 생성 (한글 제거, 공백을 언더스코어로 변경)
    const sanitizedRecipient = recipient
      .replace(/[^a-zA-Z0-9가-힣\s]/g, "")
      .replace(/\s+/g, "_")
      .substring(0, 20); // 최대 20자로 제한

    const fileName = `pinggyeking_canvas_card_${cardType}_${sanitizedRecipient}_${Date.now()}.jpg`;

    // Canvas에서 고품질 JPEG Blob 생성
    const blob = await canvasRef.getCanvasAsBlob("image/jpeg", 0.95);

    if (!blob) {
      throw new Error("Canvas에서 이미지를 생성할 수 없습니다.");
    }

    // 다운로드 링크 생성
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;

    // 다운로드 실행
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 메모리 정리
    URL.revokeObjectURL(downloadUrl);

    // 성공 메시지는 상위에서 처리하도록 함 (Toast 등)
    console.log(successMessage);

    return true;
  } catch (error) {
    console.error("Canvas 카드 다운로드 중 오류가 발생했습니다:", error);
    alert(errorMessage);
    return false;
  }
};

// Canvas 카드를 PNG로 다운로드하는 함수
export const downloadCanvasCardAsPNG = async (
  canvasRef: CanvasCardRef,
  recipient: string = "card",
  cardType: "default" | "formal" | "cute" | "humorous" | "pop" = "default",
  successMessage: string = "카드가 저장되었어요!",
  errorMessage: string = "카드 저장에 실패했습니다.",
): Promise<boolean> => {
  try {
    const sanitizedRecipient = recipient
      .replace(/[^a-zA-Z0-9가-힣\s]/g, "")
      .replace(/\s+/g, "_")
      .substring(0, 20);

    const fileName = `pinggyeking_canvas_card_${cardType}_${sanitizedRecipient}_${Date.now()}.png`;

    // Canvas에서 PNG Blob 생성
    const blob = await canvasRef.getCanvasAsBlob("image/png");

    if (!blob) {
      throw new Error("Canvas에서 이미지를 생성할 수 없습니다.");
    }

    // 다운로드 링크 생성
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;

    // 다운로드 실행
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 메모리 정리
    URL.revokeObjectURL(downloadUrl);

    console.log(successMessage);

    return true;
  } catch (error) {
    console.error("Canvas 카드 PNG 다운로드 중 오류가 발생했습니다:", error);
    alert(errorMessage);
    return false;
  }
};

// Canvas 카드를 공유용으로 Blob 형태로 반환하는 함수
export const getCanvasCardAsBlob = async (
  canvasRef: CanvasCardRef,
  type: "image/jpeg" | "image/png" = "image/jpeg",
  quality?: number,
): Promise<Blob | null> => {
  try {
    return await canvasRef.getCanvasAsBlob(type, quality);
  } catch (error) {
    console.error("Canvas 카드 Blob 생성 중 오류:", error);
    return null;
  }
};

// Canvas 카드를 DataURL로 반환하는 함수 (카카오톡 공유 등에 사용)
export const getCanvasCardAsDataURL = (
  canvasRef: CanvasCardRef,
  type: "image/jpeg" | "image/png" = "image/jpeg",
  quality?: number,
): string => {
  try {
    return canvasRef.getCanvasAsDataURL(type, quality);
  } catch (error) {
    console.error("Canvas 카드 DataURL 생성 중 오류:", error);
    return "";
  }
};
