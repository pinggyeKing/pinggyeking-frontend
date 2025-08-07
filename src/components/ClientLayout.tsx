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

  // 다른 페이지들은 공통 레이아웃 적용
  return (
    <>
      <div className="flex flex-col items-center pt-[35px] min-h-screen">
        {/* 공통 타이틀 */}
        <div className="text-extra-title text-grey-8 text-center leading-[68px] mb-[51px]">
          변명연구소
        </div>

        {/* 페이지별 콘텐츠 */}
        <div className="w-full flex-1">
          <div className="flex flex-col items-center min-h-full">
            <div className="w-[375px] radius-24 flex flex-col items-center justify-center gap-5 px-6 border-2 border-grey-7 bg-grey-0">
              {children}
            </div>
          </div>
        </div>
      </div>
      {showNavigation && <Navigation />}
    </>
  );
};

export default ClientLayout;
