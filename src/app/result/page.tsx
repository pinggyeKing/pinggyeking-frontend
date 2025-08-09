"use client";

import React, { useState, useEffect } from "react";
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
import { useToast } from "@/components/common/Toast";
import Modal from "@/components/common/Modal";
import FigmaTextBox from "@/components/FigmaTextBox";
import {
  generateExcuse,
  ExcuseGenerateRequest,
  ExcuseGenerateResponse,
} from "@/lib/api";

export default function ResultPage() {
  const router = useRouter();
  const [resultText, setResultText] = useState("");

  // 서버에서 받아올 캐릭터 정보 (임시로 state로 설정)
  const [characterType, setCharacterType] = useState<string>("default");

  // 핑계 데이터 상태
  const [excuseData, setExcuseData] = useState<ExcuseGenerateResponse | null>(
    null
  );

  // 로딩 상태
  const [isRegenerating, setIsRegenerating] = useState(false);

  // 페이지 로드 시 저장된 결과 데이터 불러오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedResult = localStorage.getItem("excuse_result");
      if (savedResult) {
        const resultData = JSON.parse(savedResult) as ExcuseGenerateResponse;
        setExcuseData(resultData);
        setResultText(resultData.excuse.excuse);
      } else {
        // 저장된 결과가 없으면 기본 텍스트 사용
        setResultText(`부장님, 정말 죄송합니다만....내일 회식에 
참석하지 못할 것 같습니다... 

이유,,,, 

,,,, `);
      }
    }
  }, []);

  // localStorage에서 초기값 로드하는 함수들
  const getInitialLikeStatus = (): "none" | "like" | "dislike" => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("result_like_status");
      return saved ? (saved as "none" | "like" | "dislike") : "none";
    }
    return "none";
  };

  const getInitialRegenerateOption = (): "구체적으로" | "간결하게" | null => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("result_regenerate_option");
      return saved ? (saved as "구체적으로" | "간결하게") : null;
    }
    return null;
  };

  // 좋아요/싫어요 상태 관리
  const [likeStatus, setLikeStatus] = useState<"none" | "like" | "dislike">(
    getInitialLikeStatus
  );

  // 재생성 드롭다운 상태 관리
  const [isRegenerateOpen, setIsRegenerateOpen] = useState(false);

  // 선택된 재생성 옵션 상태 관리
  const [selectedRegenerateOption, setSelectedRegenerateOption] = useState<
    "구체적으로" | "간결하게" | null
  >(getInitialRegenerateOption);

  // 홈으로 이동 모달 상태 관리
  const [showExitModal, setShowExitModal] = useState(false);

  // 피드백 모달 상태 관리
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [feedback, setFeedback] = useState("");

  // localStorage에 상태 저장하는 useEffect들
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("result_like_status", likeStatus);
    }
  }, [likeStatus]);

  useEffect(() => {
    if (typeof window !== "undefined" && selectedRegenerateOption) {
      localStorage.setItem(
        "result_regenerate_option",
        selectedRegenerateOption
      );
    }
  }, [selectedRegenerateOption]);

  const { showInfoToast } = useToast();

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
    setShowExitModal(true);
  };

  const handleExitConfirm = () => {
    // 홈으로 가기 전 local storage 삭제
    localStorage.removeItem("excuse_form_data");
    localStorage.removeItem("excuse_result");
    localStorage.removeItem("result_like_status");
    localStorage.removeItem("result_regenerate_option");
    router.push("/");
  };

  const handleExitCancel = () => {
    setShowExitModal(false);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(resultText);
    showInfoToast("복사되었어요!");
    // TODO: 복사 완료 토스트 메시지
  };

  const handleRegenerate = () => {
    setIsRegenerateOpen(!isRegenerateOpen);
  };

  const handleRegenerateOption = async (option: "구체적으로" | "간결하게") => {
    setSelectedRegenerateOption(option);
    setIsRegenerateOpen(false);
    setIsRegenerating(true);

    try {
      // localStorage에서 저장된 생성 데이터 불러오기
      const savedFormData = localStorage.getItem("excuse_form_data");
      if (!savedFormData) {
        showInfoToast("생성 정보를 찾을 수 없습니다.");
        return;
      }

      const formData = JSON.parse(savedFormData);

      // API 요청 데이터 구성
      const requestData: ExcuseGenerateRequest = {
        situation: formData.situation || "회식 참석 불가",
        target: formData.target || "상사",
        tone: formData.tone || "정중하게",
        isRegenerated: true,
        regeneratedBtnVal: option,
        questions: [
          {
            step: 1,
            prompt: "구체적으로 어떤 상황이신가요?",
            answer: formData.situation || "",
          },
          {
            step: 2,
            prompt:
              "추가로 설명하고 싶은 부분이 있나요? (상황 설명, 정도나 심각성, 관련 배경 등)",
            answer: formData.additionalInfo || "",
          },
          {
            step: 3,
            prompt: "상대방에게 전달할 때 고려해야 할 점이 있나요?",
            answer: formData.considerations || "",
          },
        ],
      };

      router.push("/loading");
      // API 호출
      const response = await generateExcuse(requestData);
      setExcuseData(response);
      setResultText(response.excuse.excuse);
      showInfoToast("핑계가 재생성되었습니다!");
    } catch (error) {
      console.error("재생성 실패:", error);
      showInfoToast("재생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleCreateImage = () => {
    setShowFeedbackModal(true);
  };

  const handleFeedbackConfirm = () => {
    setShowFeedbackModal(false);
    // TODO: 이미지 생성 페이지로 이동
    router.push("/result/1/create-image");
  };

  const handleFeedbackCancel = () => {
    setShowFeedbackModal(false);
    // TODO: 이미지 생성 페이지로 이동
    router.push("/result/1/create-image");
  };

  const handleThumbsUp = () => {
    setLikeStatus(likeStatus === "like" ? "none" : "like");
    // TODO: 서버에 좋아요 전송
  };

  const handleThumbsDown = () => {
    setLikeStatus(likeStatus === "dislike" ? "none" : "dislike");
    // TODO: 서버에 싫어요 전송
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
                pressHold={likeStatus === "like"}
                onClick={handleThumbsUp}
                leftIcon={<ThumbsUp size={20} />}
              />
            </div>
            <div className="flex-shrink-0">
              <CustomButton
                typeStyle="outline2"
                size="medium"
                round="pills"
                pressHold={likeStatus === "dislike"}
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
            <div className="flex-1 relative">
              <CustomButton
                typeStyle="outline2"
                size="medium"
                round="pills"
                onClick={handleRegenerate}
                leftIcon={<RefreshCcw size={20} />}
                rightIcon={<ChevronDown size={20} />}
                disabled={isRegenerating}
              >
                재생성
              </CustomButton>

              {/* 재생성 옵션 드롭다운 */}
              {isRegenerateOpen && !isRegenerating && (
                <div className="absolute top-full left-0 right-0 z-10">
                  <div className="flex flex-col p-1 gap-0.5">
                    <CustomButton
                      typeStyle="outline2"
                      size="medium"
                      round="pills"
                      pressHold={selectedRegenerateOption === "구체적으로"}
                      onClick={() => handleRegenerateOption("구체적으로")}
                      className="justify-start text-left"
                      disabled={isRegenerating}
                    >
                      구체적으로
                    </CustomButton>
                    <CustomButton
                      typeStyle="outline2"
                      size="medium"
                      round="pills"
                      pressHold={selectedRegenerateOption === "간결하게"}
                      onClick={() => handleRegenerateOption("간결하게")}
                      className="justify-start text-left"
                      disabled={isRegenerating}
                    >
                      간결하게
                    </CustomButton>
                  </div>
                </div>
              )}
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

      {/* 홈으로 이동 확인 모달 */}
      {showExitModal && (
        <Modal
          open={showExitModal}
          onClose={handleExitCancel}
          onCancel={handleExitCancel}
          onConfirm={handleExitConfirm}
          confirmText="확인"
          size="small"
          showCloseButton={false}
        >
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-section-title text-grey-10 text-center">
                홈으로 이동하시겠습니까?
              </p>
              <p className="text-section-subtitle text-grey-10 text-center">
                생성된 핑계를 다시 볼 수 없습니다.
              </p>
            </div>
            <Image
              src="/characters/error.svg"
              alt="처음으로 돌아갈까?"
              width={287}
              height={164}
            />
          </div>
        </Modal>
      )}

      {/* 피드백 모달 */}
      {showFeedbackModal && (
        <Modal
          open={showFeedbackModal}
          onClose={handleFeedbackCancel}
          onCancel={handleFeedbackCancel}
          onConfirm={handleFeedbackConfirm}
          confirmText="평가 제출하기"
          size="small"
          showCloseButton={true}
        >
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-section-title text-grey-10 text-center">
                생성된 핑계는 어땠나요?
              </p>
              <p className="text-section-subtitle text-grey-10 text-center">
                핑계를 평가해주세요! (선택사항)
              </p>
            </div>
            <Image
              src="/characters/suit.svg"
              alt="피드백 캐릭터"
              width={287}
              height={164}
              className="pt-[41px] pr-[80.725px] pb-[4.295px] pl-[71px]"
            />
            <FigmaTextBox
              value={feedback}
              multiline={true}
              placeholder="어떤 점이 만족스럽나요?"
              editable={true}
              onChange={setFeedback}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
