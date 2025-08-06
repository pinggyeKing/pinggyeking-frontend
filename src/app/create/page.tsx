"use client";

import Picker from "@/components/picker/Picker";
import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const pickerOptions = [
    { label: "상사/선배", value: "boss" },
    { label: "교수/선생님", value: "teacher" },
    { label: "동료/친구", value: "colleague" },
    { label: "연인/가족", value: "lover" },
    { label: "기타", value: "other" },
  ];
  const [selectedValue, setSelectedValue] = useState(pickerOptions[0].value);
  return (
    <div className="flex flex-col items-center pt-[65px] min-h-screen">
      {/* 로고 타이틀 */}
      <div className="text-extra-title text-grey-8 text-center leading-[68px] mb-[55px]">
        변명연구소
      </div>
      {/* 메인 카드 */}
      <div className="w-[400px] h-[726px] radius-24 flex flex-col items-center p-5 border-2 border-grey-7 bg-grey-0">
        <div className="flex flex-col gap-4 items-center">
          <ProgressBar stage={20} style="curved" />
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-1">
              <p className="text-section-title text-grey-10 text-center">
                누구에게 핑계를 댈까요?
              </p>
              <p className="text-section-subtitle text-grey-10 text-center">
                핑계를 말할 상대를 선택해주세요
              </p>
            </div>
            <div className="flex justify-center items-center w-full">
              <Image
                src="/characters/default.svg"
                alt="기본 캐릭터"
                width={135}
                height={119}
              />
            </div>
            <Picker
              options={pickerOptions}
              value={selectedValue}
              onChange={setSelectedValue}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between px-5"></div>
      </div>
    </div>
  );
}
