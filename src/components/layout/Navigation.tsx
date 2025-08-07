"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { Home, LayoutDashboard, ChevronDown, ChevronUp } from "lucide-react";
import { useSplash } from "@/contexts/SplashContext";

interface IMenuItem {
  label?: string;
  href: string;
  ariaLabel: string;
  icon: React.ElementType;
}

const menuItems: IMenuItem[] = [
  {
    label: "핑계 생성",
    href: "/", // 기본 페이지를 핑계 생성으로 가정
    ariaLabel: "핑계 생성 페이지로 이동",
    icon: Home,
  },
  {
    href: "/gallery",
    ariaLabel: "핑계 갤러리 페이지로 이동",
    icon: LayoutDashboard,
  },
];

const Navigation = () => {
  const currentPath = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const { showSplash } = useSplash();

  // Don't render navigation during splash screen
  if (showSplash) {
    return null;
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <nav
      className={`md:absolute md:bottom-2 md:left-1/2 md:-translate-x-1/2 md:w-[431px] fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[450px] ${
        !isVisible ? "pb-5" : ""
      }`}
      aria-label="메인 네비게이션"
    >
      <div className="flex flex-col items-center gap-1">
        {/* Toggle Arrow Button */}
        <button
          onClick={toggleVisibility}
          className="flex h-10 w-10 items-center justify-center transition-colors duration-200"
          aria-label={isVisible ? "네비게이션 숨기기" : "네비게이션 보이기"}
        >
          {isVisible ? (
            <ChevronDown className="h-10 w-10 text-[#1E1E1E]" strokeWidth={2} />
          ) : (
            <ChevronUp className="h-10 w-10 text-[#1E1E1E]" strokeWidth={2} />
          )}
        </button>

        {/* Navigation Container */}
        {isVisible && (
          <div className="w-full border-2 border-grey-2 rounded-[32px] bg-grey-2 p-2">
            <div className="flex items-stretch justify-stretch gap-8 rounded-[24px] bg-white px-6 py-4">
              {menuItems.map(({ label, href, ariaLabel, icon: Icon }) => {
                const isActive = currentPath === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-label={ariaLabel}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-[24px] border-2 px-4 py-3 font-normal transition-colors duration-200 
                    ${
                      isActive
                        ? "border-[#1E1E1E] bg-[#1E1E1E] text-white"
                        : "border-[#1E1E1E] bg-white text-[#1E1E1E] hover:bg-gray-50"
                    }`}
                    style={{
                      fontFamily: "var(--font-ownglyph-pdh)",
                      fontSize: "26px",
                      lineHeight: "24px",
                      fontWeight: "400",
                    }}
                  >
                    <Icon
                      className="h-6 w-6"
                      strokeWidth={isActive ? 2.5 : 2}
                      aria-hidden="true"
                    />
                    <span className="leading-none">{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
