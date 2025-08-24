// 액션 버튼들 컴포넌트

import CustomButton from "@/components/Custombutton";
import {
  ChevronDown,
  Copy,
  RefreshCcw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { LikeStatus, RegenerateOption } from "../types";
import { REGENERATE_OPTIONS } from "../constants";

interface ActionButtonsProps {
  likeStatus: LikeStatus;
  isRegenerateOpen: boolean;
  selectedRegenerateOption: RegenerateOption | null;
  onThumbsUp: () => void;
  onThumbsDown: () => void;
  onCopyText: () => void;
  onRegenerate: () => void;
  onRegenerateOption: (option: RegenerateOption) => void;
}

export default function ActionButtons({
  likeStatus,
  isRegenerateOpen,
  selectedRegenerateOption,
  onThumbsUp,
  onThumbsDown,
  onCopyText,
  onRegenerate,
  onRegenerateOption,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-col">
      {/* 모든 버튼을 한 줄에 배치 */}
      <div className="flex gap-1">
        <div className="flex-shrink-0">
          <CustomButton
            typeStyle="outline2"
            size="medium"
            round="pills"
            pressHold={likeStatus === "like"}
            onClick={onThumbsUp}
            leftIcon={<ThumbsUp size={20} />}
          />
        </div>
        <div className="flex-shrink-0">
          <CustomButton
            typeStyle="outline2"
            size="medium"
            round="pills"
            pressHold={likeStatus === "dislike"}
            onClick={onThumbsDown}
            leftIcon={<ThumbsDown size={20} />}
          />
        </div>
        <div className="flex-shrink-0">
          <CustomButton
            typeStyle="outline2"
            size="medium"
            round="pills"
            onClick={onCopyText}
            leftIcon={<Copy size={20} />}
          />
        </div>
        <div className="flex-1 relative">
          <CustomButton
            typeStyle="outline2"
            size="medium"
            round="pills"
            onClick={onRegenerate}
            leftIcon={<RefreshCcw size={20} />}
            rightIcon={<ChevronDown size={20} />}
            className="whitespace-nowrap"
          >
            재생성
          </CustomButton>

          {/* 재생성 옵션 드롭다운 */}
          {isRegenerateOpen && (
            <div className="absolute top-full left-0 right-0 z-10">
              <div className="flex flex-col p-1 gap-0.5">
                {REGENERATE_OPTIONS.map((option) => (
                  <CustomButton
                    key={option}
                    typeStyle="outline2"
                    size="medium"
                    round="pills"
                    pressHold={selectedRegenerateOption === option}
                    onClick={() => onRegenerateOption(option)}
                    className="justify-start text-left"
                  >
                    {option}
                  </CustomButton>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
