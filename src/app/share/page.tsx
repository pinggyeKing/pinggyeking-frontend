"use client";

import Card from "@/app/result/card-image/components/Card";
import FigmaButton from "@/components/FigmaButton";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SharePage() {
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // 데스크탑 여부 체크 함수
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint (768px)
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => {
      window.removeEventListener("resize", checkIsDesktop);
    };
  }, []);

  const handleGenerateClick = () => {
    router.push("/create");
  };

  const message = `부장님, 정말 죄송합니다만....내일 회식에 참석하지 못할 것 같습니다... 


이유,,,, 

,,,, `;

  // 서버사이드 렌더링과 클라이언트 렌더링 차이를 방지
  if (!isMounted) {
    return (
      <div className="flex flex-col items-center justify-between gap-6">
        {/* Card Preview */}
        <div className="flex justify-center">
          <div className="transform origin-center">
            <Card
              recipient="부장님"
              message={message}
              cardType="default"
              scale={0.82}
            />
          </div>
        </div>

        {/* FigmaButton Component */}
        <div style={{ width: "361px" }}>
          <div
            style={{
              backgroundColor: "#1E1E1E",
              borderRadius: "24px",
              overflow: "hidden",
            }}
          >
            <FigmaButton
              variant="primary"
              round="pills"
              size={1.0}
              onClick={handleGenerateClick}
              className="w-full min-h-[48px]"
            >
              나도 핑계 생성 해볼까?
            </FigmaButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between gap-6">
      {/* Card Preview */}
      <div className="flex justify-center">
        <div className="transform origin-center">
          <Card
            recipient="부장님"
            message={message}
            cardType="default"
            scale={isDesktop ? 0.65 : 0.82}
          />
        </div>
      </div>

      {/* FigmaButton Component */}
      <div style={{ width: "100%" }}>
        <div
          style={{
            backgroundColor: "#1E1E1E",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          <FigmaButton
            variant="primary"
            round="pills"
            size={1.0}
            onClick={handleGenerateClick}
            className="w-full min-h-[48px]"
          >
            나도 핑계 생성 해볼까?
          </FigmaButton>
        </div>
      </div>
    </div>
  );
}
