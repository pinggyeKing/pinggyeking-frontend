// body scroll 방지를 위한 커스텀 훅

import { useEffect } from "react";

/**
 * 모달이나 오버레이가 열렸을 때 body 스크롤을 방지하는 커스텀 훅
 * @param isOpen 모달이 열린 상태인지 여부
 */
export const useBodyScrollLock = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;

      // body에 스타일 적용하여 스크롤 방지
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      // cleanup 함수 - 모달이 닫힐 때 원래 상태로 복원
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        // 원래 스크롤 위치로 복원
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);
};
