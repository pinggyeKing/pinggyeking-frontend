"use client";

import CustomButton from "@/components/Custombutton";
import FunctionIndicator from "@/components/FunctionIndicator";
import PrivacyModal from "@/components/PrivacyModal";
import Image from "next/image";
import { Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const handlePrivacyClick = () => {
    setIsPrivacyModalOpen(true);
  };

  const closePrivacyModal = () => {
    setIsPrivacyModalOpen(false);
  };
  return (
    <div className="flex flex-col items-center pt-[35px] min-h-screen">
      {/* 로고 타이틀 */}
      <div className="text-extra-title text-grey-8 text-center leading-[68px] mb-[55px]">
        변명연구소
      </div>

      {/* 메인 카드 */}
      <div
        className="w-[327px] h-[376px] radius-24 flex flex-col justify-center items-center py-8 px-5 mb-7"
        style={{
          backgroundImage: "url(/maincard.svg)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* 상단 텍스트 */}
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="text-section-title text-grey-10 leading-6">
            완벽한 핑계를 찾고 있나요?
          </div>
          <div className="text-section-subtitle text-grey-10 leading-[18px]">
            AI가 상황에 맞는 완벽한 핑계를 만들어 드려요
          </div>
        </div>

        {/* 캐릭터 이미지 */}
        <div className="w-[135px] h-[119px] flex justify-center items-center mb-4">
          <Image
            src="/characters/default.svg"
            alt="기본 캐릭터"
            width={135}
            height={119}
          />
        </div>

        {/* 버튼 */}
        <div className="w-[130px] h-[48px] flex justify-center">
          <CustomButton round="square">
            <Link href="/create">핑계 만들기</Link>
          </CustomButton>
        </div>
      </div>

      {/* 하단 텍스트 */}
      <div className="w-full flex flex-row items-center border-t border-grey-4 px-[12px] py-[24px]">
        <FunctionIndicator
          icon={<Info size={16} />}
          label="서비스 개선을 위해 익명 사용통계를 수집합니다."
          hasChild={true}
          onClick={handlePrivacyClick}
        />
      </div>

      {/* 개인정보 수집안내 모달 */}
      <PrivacyModal isOpen={isPrivacyModalOpen} onClose={closePrivacyModal} />
    </div>
  );
}
