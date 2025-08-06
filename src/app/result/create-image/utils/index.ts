import html2canvas from "html2canvas";

// 카카오톡 공유하기 관련 타입 정의
export interface KakaoShareContent {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl?: string;
  buttonTitle?: string;
}

// 상대 경로를 절대 URL로 변환하는 함수
const getAbsoluteUrl = (relativePath: string): string => {
  if (relativePath.startsWith("http")) {
    // 이미 완전한 URL인 경우
    return relativePath;
  }

  // 상대 경로를 절대 URL로 변환
  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "";

  return `${baseUrl}${
    relativePath.startsWith("/") ? relativePath : "/" + relativePath
  }`;
};

// 카카오 SDK 초기화 함수
export const initKakaoSDK = (appKey: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // 이미 초기화되어 있다면 바로 resolve
    if (window.Kakao && window.Kakao.isInitialized()) {
      resolve(true);
      return;
    }

    // 스크립트가 이미 로드되어 있는지 확인
    if (document.querySelector('script[src*="kakao.min.js"]')) {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(appKey);
      }
      resolve(true);
      return;
    }

    // 카카오 SDK 스크립트 동적 로드
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init(appKey);
        resolve(true);
      } else {
        resolve(false);
      }
    };
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
};

// 카카오톡 공유하기 함수
export const shareToKakao = async (
  content: KakaoShareContent,
  appKey: string = process.env.NEXT_PUBLIC_KAKAO_APP_KEY || "",
): Promise<boolean> => {
  try {
    // 앱 키가 없으면 에러
    if (!appKey) {
      console.error("카카오 앱 키가 설정되지 않았습니다.");
      return false;
    }

    // SDK 초기화
    const isInitialized = await initKakaoSDK(appKey);
    if (!isInitialized) {
      console.error("카카오 SDK 초기화에 실패했습니다.");
      return false;
    }

    // 카카오톡 공유하기 실행
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: content.title,
        description: content.description,
        imageUrl: content.imageUrl,
        link: {
          mobileWebUrl: content.linkUrl || window.location.href,
          webUrl: content.linkUrl || window.location.href,
        },
      },
      buttons: [
        {
          title: content.buttonTitle || "웹으로 보기",
          link: {
            mobileWebUrl: content.linkUrl || window.location.href,
            webUrl: content.linkUrl || window.location.href,
          },
        },
      ],
      // 카카오톡 공유 조회수 반영 및 카카오 개발자사이트 도메인 체크 기능
      installTalk: true,
    });

    return true;
  } catch (error) {
    console.error("카카오톡 공유하기 중 오류가 발생했습니다:", error);
    return false;
  }
};

// 이미지 생성 결과 공유를 위한 전용 함수
export const shareImageResult = async (
  imageUrl: string,
  resultTitle: string = "변명 연구소에서 만든 나만의 핑계",
  resultDescription: string = "AI가 만들어준 완벽한 핑계를 확인해보세요!",
): Promise<boolean> => {
  const shareContent: KakaoShareContent = {
    title: resultTitle,
    description: resultDescription,
    imageUrl: getAbsoluteUrl(imageUrl),
    linkUrl: window.location.href,
    buttonTitle: "나도 핑계 만들기",
  };

  return await shareToKakao(shareContent);
};

// 일반적인 텍스트 공유 함수
export const shareTextResult = async (
  title: string,
  description: string,
  thumbnailUrl?: string,
): Promise<boolean> => {
  const shareContent: KakaoShareContent = {
    title: title,
    description: description,
    imageUrl: thumbnailUrl
      ? getAbsoluteUrl(thumbnailUrl)
      : getAbsoluteUrl("/Logo.svg"), // 기본 로고 사용
    linkUrl: window.location.href,
    buttonTitle: "변명 연구소 바로가기",
  };

  return await shareToKakao(shareContent);
};

// 링크 복사하기 함수
export const copyToClipboard = async (
  text: string,
  successMessage?: string,
  errorMessage?: string,
): Promise<boolean> => {
  try {
    // navigator.clipboard API가 지원되는지 확인
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);

      // 성공 메시지 표시 (옵션)
      if (successMessage) {
        alert(successMessage);
      }

      return true;
    } else {
      // 폴백: 구식 방법 사용
      return fallbackCopyToClipboard(text, successMessage, errorMessage);
    }
  } catch (error) {
    console.error("클립보드 복사 중 오류가 발생했습니다:", error);

    // 에러 메시지 표시 (옵션)
    if (errorMessage) {
      alert(errorMessage);
    }

    // 폴백 시도
    return fallbackCopyToClipboard(text, successMessage, errorMessage);
  }
};

// 구식 브라우저용 폴백 함수
const fallbackCopyToClipboard = (
  text: string,
  successMessage?: string,
  errorMessage?: string,
): boolean => {
  try {
    // 임시 textarea 요소 생성
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    // 복사 실행
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);

    if (successful) {
      if (successMessage) {
        alert(successMessage);
      }
      return true;
    } else {
      throw new Error("document.execCommand copy failed");
    }
  } catch (error) {
    console.error("폴백 복사 방법도 실패했습니다:", error);

    if (errorMessage) {
      alert(errorMessage);
    }

    return false;
  }
};

// 현재 페이지 URL 복사하기
export const copyCurrentUrl = async (
  successMessage: string = "링크가 복사되었습니다!",
  errorMessage: string = "링크 복사에 실패했습니다.",
): Promise<boolean> => {
  return await copyToClipboard(
    window.location.href,
    successMessage,
    errorMessage,
  );
};

// 커스텀 링크 복사하기 (파라미터로 받은 링크)
export const copyCustomLink = async (
  link: string,
  successMessage: string = "링크가 복사되었습니다!",
  errorMessage: string = "링크 복사에 실패했습니다.",
): Promise<boolean> => {
  return await copyToClipboard(link, successMessage, errorMessage);
};

// 결과 공유용 링크 생성 및 복사
export const copyResultLink = async (
  resultId?: string,
  baseUrl?: string,
  successMessage: string = "결과 링크가 복사되었습니다!",
  errorMessage: string = "링크 복사에 실패했습니다.",
): Promise<boolean> => {
  const currentUrl = baseUrl || window.location.href;
  const shareUrl = resultId ? `${currentUrl}?result=${resultId}` : currentUrl;

  return await copyToClipboard(shareUrl, successMessage, errorMessage);
};

// 이미지 다운로드 관련 함수들
export const downloadImage = async (
  imageUrl: string,
  fileName: string = "image.jpg",
  successMessage: string = "이미지가 저장되었어요!",
  errorMessage: string = "이미지 저장에 실패했습니다.",
): Promise<boolean> => {
  try {
    // 이미지 URL이 유효한지 확인
    if (!imageUrl) {
      console.error("이미지 URL이 제공되지 않았습니다.");
      alert(errorMessage);
      return false;
    }

    // 이미지 로드
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();

    // JPG 형태로 변환 (이미 JPG인 경우 그대로 사용)
    const jpgBlob =
      blob.type === "image/jpeg" || blob.type === "image/jpg"
        ? blob
        : await convertToJPG(blob);

    // 다운로드 링크 생성
    const downloadUrl = URL.createObjectURL(jpgBlob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName.endsWith(".jpg") ? fileName : `${fileName}.jpg`;

    // 다운로드 실행
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 메모리 정리
    URL.revokeObjectURL(downloadUrl);

    // 성공 메시지 표시
    alert(successMessage);

    return true;
  } catch (error) {
    console.error("이미지 다운로드 중 오류가 발생했습니다:", error);
    alert(errorMessage);
    return false;
  }
};

// 이미지를 JPG로 변환하는 함수
const convertToJPG = (blob: Blob): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // 캔버스 크기 설정
      canvas.width = img.width;
      canvas.height = img.height;

      // 이미지를 캔버스에 그리기
      ctx?.drawImage(img, 0, 0);

      // JPG로 변환 (품질: 0.9)
      canvas.toBlob(
        (jpgBlob) => {
          if (jpgBlob) {
            resolve(jpgBlob);
          } else {
            reject(new Error("JPG 변환에 실패했습니다."));
          }
        },
        "image/jpeg",
        0.9,
      );
    };

    img.onerror = () => {
      reject(new Error("이미지 로드에 실패했습니다."));
    };

    // Blob URL 생성하여 이미지 로드
    const imageUrl = URL.createObjectURL(blob);
    img.src = imageUrl;

    // 이미지 로드 후 URL 정리
    img.onload = () => {
      URL.revokeObjectURL(imageUrl);
    };
  });
};

// Canvas 요소를 JPG로 다운로드하는 함수
export const downloadCanvasAsJPG = async (
  canvas: HTMLCanvasElement,
  fileName: string = "image.jpg",
  successMessage: string = "이미지가 저장되었어요!",
  errorMessage: string = "이미지 저장에 실패했습니다.",
): Promise<boolean> => {
  try {
    // Canvas를 JPG Blob으로 변환
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (jpgBlob) => {
          if (jpgBlob) {
            resolve(jpgBlob);
          } else {
            reject(new Error("Canvas를 JPG로 변환하는데 실패했습니다."));
          }
        },
        "image/jpeg",
        0.9,
      );
    });

    // 다운로드 링크 생성
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName.endsWith(".jpg") ? fileName : `${fileName}.jpg`;

    // 다운로드 실행
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 메모리 정리
    URL.revokeObjectURL(downloadUrl);

    // 성공 메시지 표시
    alert(successMessage);

    return true;
  } catch (error) {
    console.error("Canvas 다운로드 중 오류가 발생했습니다:", error);
    alert(errorMessage);
    return false;
  }
};

// DOM 요소를 이미지로 변환하여 다운로드하는 함수
export const downloadElementAsJPG = async (
  element: HTMLElement,
  fileName: string = "image.jpg",
  successMessage: string = "이미지가 저장되었어요!",
  errorMessage: string = "이미지 저장에 실패했습니다.",
): Promise<boolean> => {
  try {
    // html2canvas 라이브러리가 필요합니다
    // npm install html2canvas
    // import html2canvas from 'html2canvas';

    // 임시로 html2canvas 없이 Canvas API 사용
    // 실제 사용시에는 html2canvas를 설치하고 아래 주석을 해제하세요

    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      scale: 2, // 고해상도
      backgroundColor: "#ffffff",
    });

    return await downloadCanvasAsJPG(
      canvas,
      fileName,
      successMessage,
      errorMessage,
    );
  } catch (error) {
    console.error("요소 다운로드 중 오류가 발생했습니다:", error);
    alert(errorMessage);
    return false;
  }
};

// Window 객체에 Kakao 타입 추가
declare global {
  interface Window {
    Kakao: any;
  }
}

// Card 컴포넌트 다운로드 관련 함수들

// Card 컴포넌트를 JPG 이미지로 다운로드하는 함수
export const downloadCardAsJPG = async (
  cardElement: HTMLElement,
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

    const fileName = `pinggyeking_card_${cardType}_${sanitizedRecipient}_${Date.now()}`;

    // html2canvas 설정을 Card에 맞게 최적화
    const canvas = await html2canvas(cardElement, {
      useCORS: true,
      allowTaint: true,
      scale: 3, // 카드를 위한 고해상도
      backgroundColor: "#ffffff",
      width: 440, // Card 컴포넌트의 고정 너비
      height: 490, // Card 컴포넌트의 고정 높이
      logging: false, // 로깅 비활성화
      imageTimeout: 15000, // 이미지 로드 타임아웃
      removeContainer: true,
    });

    return await downloadCanvasAsJPG(
      canvas,
      fileName,
      successMessage,
      errorMessage,
    );
  } catch (error) {
    console.error("Card 다운로드 중 오류가 발생했습니다:", error);
    alert(errorMessage);
    return false;
  }
};

// Card의 ref를 이용한 다운로드 함수
export const downloadCardByRef = async (
  cardRef: React.RefObject<HTMLDivElement | null>,
  recipient: string = "card",
  cardType: "default" | "formal" | "cute" | "humorous" | "pop" = "default",
  successMessage: string = "카드가 저장되었어요!",
  errorMessage: string = "카드 저장에 실패했습니다.",
): Promise<boolean> => {
  if (!cardRef.current) {
    console.error("Card 요소를 찾을 수 없습니다.");
    alert(errorMessage);
    return false;
  }

  return await downloadCardAsJPG(
    cardRef.current,
    recipient,
    cardType,
    successMessage,
    errorMessage,
  );
};

// Card ID나 클래스명으로 찾아서 다운로드하는 함수
export const downloadCardById = async (
  cardId: string,
  recipient: string = "card",
  cardType: "default" | "formal" | "cute" | "humorous" | "pop" = "default",
  successMessage: string = "카드가 저장되었어요!",
  errorMessage: string = "카드 저장에 실패했습니다.",
): Promise<boolean> => {
  const cardElement = document.getElementById(cardId);

  if (!cardElement) {
    console.error(`ID "${cardId}"인 Card 요소를 찾을 수 없습니다.`);
    alert(errorMessage);
    return false;
  }

  return await downloadCardAsJPG(
    cardElement,
    recipient,
    cardType,
    successMessage,
    errorMessage,
  );
};

// Card 클래스명으로 찾아서 다운로드하는 함수 (첫 번째 요소)
export const downloadCardByClassName = async (
  className: string,
  recipient: string = "card",
  cardType: "default" | "formal" | "cute" | "humorous" | "pop" = "default",
  successMessage: string = "카드가 저장되었어요!",
  errorMessage: string = "카드 저장에 실패했습니다.",
): Promise<boolean> => {
  const cardElement = document.querySelector(`.${className}`) as HTMLElement;

  if (!cardElement) {
    console.error(`클래스명 "${className}"인 Card 요소를 찾을 수 없습니다.`);
    alert(errorMessage);
    return false;
  }

  return await downloadCardAsJPG(
    cardElement,
    recipient,
    cardType,
    successMessage,
    errorMessage,
  );
};

// 고화질 PNG로 Card 다운로드하는 함수 (선택적)
export const downloadCardAsPNG = async (
  cardElement: HTMLElement,
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

    const fileName = `pinggyeking_card_${cardType}_${sanitizedRecipient}_${Date.now()}.png`;

    const canvas = await html2canvas(cardElement, {
      useCORS: true,
      allowTaint: true,
      scale: 3,
      backgroundColor: "#ffffff",
      width: 440,
      height: 490,
      logging: false,
      imageTimeout: 15000,
      removeContainer: true,
    });

    // PNG Blob 생성
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((pngBlob) => {
        if (pngBlob) {
          resolve(pngBlob);
        } else {
          reject(new Error("Canvas를 PNG로 변환하는데 실패했습니다."));
        }
      }, "image/png");
    });

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

    // 성공 메시지 표시
    alert(successMessage);

    return true;
  } catch (error) {
    console.error("Card PNG 다운로드 중 오류가 발생했습니다:", error);
    alert(errorMessage);
    return false;
  }
};
