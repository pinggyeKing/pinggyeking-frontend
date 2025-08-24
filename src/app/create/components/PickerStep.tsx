import Image from "next/image";
import Picker from "@/components/picker/Picker";
import { PickerOption } from "../types";

interface PickerStepProps {
  title: string;
  subtitle: string;
  options: PickerOption[];
  value: string;
  onChange: (value: string) => void;
}

export const PickerStep = ({
  title,
  subtitle,
  options,
  value,
  onChange,
}: PickerStepProps) => {
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
      <Picker options={options} value={value} onChange={onChange} />
    </div>
  );
};
