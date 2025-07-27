// 카카오톡 공유하기 관련 타입 정의
export interface KakaoShareContent {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl?: string;
  buttonTitle?: string;
}

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
    imageUrl: imageUrl,
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
    imageUrl: thumbnailUrl || "/Logo.svg", // 기본 로고 사용
    linkUrl: window.location.href,
    buttonTitle: "변명 연구소 바로가기",
  };

  return await shareToKakao(shareContent);
};

// Window 객체에 Kakao 타입 추가
declare global {
  interface Window {
    Kakao: any;
  }
}
