import Image from "next/image";
import FigmaTextBox from "@/components/FigmaTextBox";
import Balloon from "@/components/inputs/Balloon";

interface TextStepProps {
  title: string;
  subtitle: string;
  balloonText: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const TextStep = ({
  title,
  subtitle,
  balloonText,
  value,
  onChange,
  required = false,
}: TextStepProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-[10px]">
      <div className="flex flex-col gap-1">
        <p className="text-section-title text-grey-10 text-center">{title}</p>
        <p className="text-section-subtitle text-grey-10 text-center">
          {subtitle}
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

      {/* 도움말 말풍선 */}
      <div className="w-full flex justify-center">
        <Balloon text={balloonText} />
      </div>

      {/* 사용자 입력 말풍선 */}
      <div className="w-full h-full flex justify-center">
        <FigmaTextBox
          value={value}
          multiline={true}
          editable={true}
          onChange={onChange}
          status={value.trim() ? "inputed" : "default"}
        />
      </div>
    </div>
  );
};
