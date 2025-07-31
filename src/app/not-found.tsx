"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import CustomButton from "@/components/Custombutton";
import { useNavigation } from "@/contexts/NavigationContext";

function NotFound() {
  const [isVisible, setIsVisible] = useState(false);
  const { hideNavigation, showNavigationBar } = useNavigation();

  useEffect(() => {
    // 404 페이지에서는 네비게이션 숨기기
    hideNavigation();

    // 페이지 로드 시 애니메이션 효과
    setIsVisible(true);

    // 컴포넌트 언마운트 시 네비게이션 다시 보이기
    return () => {
      showNavigationBar();
    };
  }, [hideNavigation, showNavigationBar]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-5">
      <div
        className={`flex w-full px-1.25 py-2.5 flex-col items-center gap-[36px] text-center transition-all duration-700 transform ${
          isVisible ? "opacity-100 blur-0" : "opacity-0 blur-sm"
        }`}
      >
        {/* 텍스트 섹션 */}
        <div className="flex flex-col items-center gap-[24px] self-stretch">
          <div className="space-y-1">
            <div className="text-center text-section-title text-gray-10">
              찾을수 없는 페이지 입니다.
            </div>
            <div className="text-center text-section-subtitle text-gray-10">
              요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요 :)
            </div>
          </div>

          {/* 슬픈 캐릭터 섹션 */}
          <div className="flex justify-center">
            <div className="flex h-[164px] pt-[41px] pr-[127px] pb-[4px] pl-[120px] items-center self-stretch transition-all duration-1000 delay-300 transform">
              <Image
                src="/characters/sad.svg"
                alt="슬픈 캐릭터"
                width={113}
                height={119}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* 홈으로 이동 버튼 */}
        <div className="flex justify-center">
          <CustomButton round="square">
            <Link
              href="/"
              className="w-full h-full"
              onClick={showNavigationBar}
            >
              {"홈으로 이동"}
            </Link>
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
