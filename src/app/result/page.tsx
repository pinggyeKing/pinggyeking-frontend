"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/Custombutton";
import Balloon from "@/components/inputs/Balloon";
import Image from "next/image";
import {
  ChevronDown,
  Copy,
  RefreshCcw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

export default function ResultPage() {
  const router = useRouter();
  const [resultText] = useState(`부장님, 정말 죄송합니다만....내일 회식에 
참석하지 못할 것 같습니다... 

이유,,,, 

,,,, `);

  // 서버에서 받아올 캐릭터 정보 (임시로 state로 설정)
  const [characterType, setCharacterType] = useState<string>("default");

  // 캐릭터 타입에 따른 이미지 경로 매핑
  const getCharacterImage = (type: string) => {
    const characterMap: { [key: string]: string } = {
      default: "/characters/default.svg",
      casual: "/characters/casual.svg",
      formal: "/characters/formal.svg",
      student: "/characters/student.svg",
      // 필요에 따라 더 많은 캐릭터 타입 추가 가능
    };

    return characterMap[type] || characterMap.default;
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(resultText);
    // TODO: 복사 완료 토스트 메시지
  };

  const handleRegenerate = () => {
    // TODO: 재생성 로직
    router.push("/loading");
  };

  const handleCreateImage = () => {
    // TODO: 이미지 생성 페이지로 이동
  };

  const handleThumbsUp = () => {
    // TODO: 좋아요 처리
  };

  const handleThumbsDown = () => {
    // TODO: 싫어요 처리
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* 상단 헤더 */}
      <div className="w-full flex flex-col gap-1 items-center">
        <div className="w-full flex justify-end">
          <div className="w-[100px]">
            <CustomButton
              typeStyle="primary"
              size="medium"
              round="pills"
              onClick={handleGoHome}
            >
              처음으로
            </CustomButton>
          </div>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-section-title text-grey-10 text-center">
            핑계가 완성되었어요!
          </h1>
          <p className="text-section-subtitle text-grey-10 text-center">
            아래 생성된 핑계를 확인해주세요
          </p>
        </div>

        {/* 캐릭터 */}
        <div className="flex justify-center pt-[40px] pb-[4.32px]">
          <Image
            src="/characters/default.svg"
            alt="정장 캐릭터"
            width={112}
            height={120}
          />
        </div>
      </div>

      {/* 결과 텍스트 영역 */}
      <div className="flex-1 flex flex-col gap-3">
        {/* 결과 말풍선 */}
        <div className="w-full h-full mt-4">
          <Balloon text={resultText} />
        </div>

        {/* 평가 및 액션 버튼들 */}
        <div className="flex flex-col">
          {/* 모든 버튼을 한 줄에 배치 */}
          <div className="flex gap-1">
            <div className="flex-shrink-0">
              <CustomButton
                typeStyle="outline2"
                size="medium"
                round="pills"
                onClick={handleThumbsUp}
                leftIcon={<ThumbsUp size={20} />}
              />
            </div>
            <div className="flex-shrink-0">
              <CustomButton
                typeStyle="outline2"
                size="medium"
                round="pills"
                onClick={handleThumbsDown}
                leftIcon={<ThumbsDown size={20} />}
              />
            </div>
            <div className="flex-shrink-0">
              <CustomButton
                typeStyle="outline2"
                size="medium"
                round="pills"
                onClick={handleCopyText}
                leftIcon={<Copy size={20} />}
              />
            </div>
            <div className="flex-1">
              <CustomButton
                typeStyle="outline2"
                size="medium"
                round="pills"
                onClick={handleRegenerate}
                leftIcon={<RefreshCcw size={20} />}
                rightIcon={<ChevronDown size={20} />}
              >
                재생성
              </CustomButton>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 이미지 만들기 버튼 */}
      <div className="w-full px-2">
        <CustomButton
          typeStyle="primary"
          size="large"
          round="square"
          onClick={handleCreateImage}
        >
          이미지 만들기
        </CustomButton>
      </div>
    </div>
  );
}
