"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useSplash } from "@/contexts/SplashContext";
import { useNavigation } from "@/contexts/NavigationContext";
import SplashPage from "../app/splash/page";
import Navigation from "@/components/layout/Navigation";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const { showSplash } = useSplash();
  const { showNavigation } = useNavigation();
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isLoadingPage = pathname === "/loading";

  if (showSplash) {
    return <SplashPage />;
  }

  // 홈 페이지는 기존 레이아웃 그대로
  if (isHomePage) {
    return (
      <>
        {children}
        {showNavigation && <Navigation />}
      </>
    );
  }

  // 로딩 페이지는 중앙 정렬만 적용
  if (isLoadingPage) {
    return (
      <>
        <div className="flex flex-col items-center pt-[35px] pb-[140px] md:pb-[20px] px-6 w-[375px] md:w-full md:max-w-[431px] min-h-screen m-auto">
          {/* 공통 타이틀 */}
          <div className="text-extra-title text-grey-8 text-center leading-[60px] mb-[24px]">
            변명연구소
          </div>

          {/* 페이지별 콘텐츠 - 로딩 페이지는 중앙 정렬 */}
          <div className="w-full flex-1 flex justify-center">
            <div className="w-full h-full radius-24 flex flex-col justify-center items-center py-2 px-4 border-2 border-grey-7 bg-grey-0">
              {children}
            </div>
          </div>
        </div>
        {showNavigation && <Navigation />}
      </>
    );
  }

  // 다른 페이지들은 공통 레이아웃 적용
  return (
    <>
      <div className="flex flex-col items-center pt-[35px] pb-[140px] md:pb-[20px] px-6 w-[375px] md:w-full md:max-w-[431px] min-h-screen m-auto">
        {/* 공통 타이틀 */}
        <div className="text-extra-title text-grey-8 text-center leading-[60px] mb-[24px]">
          변명연구소
        </div>

        {/* 페이지별 콘텐츠 */}
        <div className="w-full flex-1 flex justify-center">
          <div className="w-full radius-24 flex flex-col py-2 px-4 border-2 border-grey-7 bg-grey-0">
            {children}
          </div>
        </div>
      </div>
      {showNavigation && <Navigation />}
    </>
  );
};

export default ClientLayout;
