"use client";

import Card from "@/app/result/card-image/components/Card";
import FigmaButton from "@/components/FigmaButton";

export default function SharePage() {
  const handleGenerateClick = () => {
    // TODO: 핑계 생성 페이지로 이동 또는 기능 구현
    console.log("핑계 생성하기 클릭됨");
  };

  const message = `부장님, 정말 죄송합니다만....내일 회식에 참석하지 못할 것 같습니다... 


이유,,,, 

,,,, `;

  return (
    <div className="flex flex-col items-center justify-between p-5 gap-6">
      {/* Card Preview */}
      <div className="flex justify-center">
        <div className="transform scale-[0.82] origin-center">
          <Card recipient="부장님" message={message} cardType="default" />
        </div>
      </div>

      {/* FigmaButton Component */}
      <div className="w-full max-w-sm">
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
