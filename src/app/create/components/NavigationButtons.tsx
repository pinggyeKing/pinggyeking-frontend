import CustomButton from "@/components/Custombutton";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const NavigationButtons = ({
  currentStep,
  totalSteps,
  canProceed,
  onPrevious,
  onNext,
}: NavigationButtonsProps) => {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="w-full flex flex-row justify-between px-5">
      <div className="w-[80px] h-[48px]">
        <CustomButton typeStyle="outline2" round="square" onClick={onPrevious}>
          이전
        </CustomButton>
      </div>
      <div className="w-[80px] h-[48px]">
        <CustomButton
          typeStyle={canProceed ? "primary" : "disable"}
          round="square"
          onClick={onNext}
          disabled={!canProceed}
        >
          {isLastStep ? "제출" : "다음"}
        </CustomButton>
      </div>
    </div>
  );
};
