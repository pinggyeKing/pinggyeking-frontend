// 상단 헤더 컴포넌트

import CustomButton from "@/components/Custombutton";
import Image from "next/image";
import { LayoutDashboard } from "lucide-react";
import { getCharacterImage } from "../utils";
import { DEFAULT_CHARACTER_SIZE } from "../constants";

interface ResultHeaderProps {
  characterType: string;
  onGoHome: () => void;
  onGoGallery?: () => void;
}

export default function ResultHeader({
  characterType,
  onGoHome,
  onGoGallery,
}: ResultHeaderProps) {
  return (
    <div className="w-full flex flex-col gap-1 items-center">
      <div className="w-full flex justify-end items-start gap-1.5">
        <div className="w-[78px] h-[40px]">
          <CustomButton
            typeStyle="primary"
            size="medium"
            round="pills"
            onClick={onGoHome}
          >
            처음으로
          </CustomButton>
        </div>
        {onGoGallery && (
          <div className="w-[120px]">
            <CustomButton
              typeStyle="outline2"
              size="medium"
              round="pills"
              onClick={onGoGallery}
            >
              핑계 갤러리
            </CustomButton>
          </div>
        )}
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
          src={getCharacterImage(characterType)}
          alt={`${characterType} 캐릭터`}
          width={DEFAULT_CHARACTER_SIZE.width}
          height={DEFAULT_CHARACTER_SIZE.height}
        />
      </div>
    </div>
  );
}
