"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import LottieLoading from "@/components/LottieLoading";
import { generateExcuse, ExcuseGenerateRequest } from "@/lib/api";
import { useToast } from "@/components/common/Toast";

export default function Loading() {
  const router = useRouter();
  const { showInfoToast } = useToast();
  const [loadingText, setLoadingText] = useState("핑계를 생성중이에요!");
  const isApiCalledRef = useRef(false); // useRef로 API 호출 상태 관리
  const [isApiCalled, setIsApiCalled] = useState(false); // UI 상태용

  useEffect(() => {
    // useRef로 중복 호출 방지 (React Strict Mode 대응)
    if (isApiCalledRef.current) {
      console.log("이미 API 호출됨 (useRef)");
      return;
    }

    // sessionStorage를 사용한 추가 중복 호출 방지
    const existingCall = sessionStorage.getItem("api_in_progress");

    if (existingCall) {
      console.log("이미 API 호출 중입니다. (sessionStorage)");
      return;
    }

    // API 호출 시작 표시
    isApiCalledRef.current = true;
    setIsApiCalled(true);

    const apiCallKey = `api_call_${Date.now()}`;
    sessionStorage.setItem("api_in_progress", apiCallKey);

    const generateExcuseData = async () => {
      try {
        console.log("API 호출 시작");

        // localStorage에서 저장된 폼 데이터 가져오기
        const savedFormData = localStorage.getItem("excuse_form_data");
        if (!savedFormData) {
          console.log("폼 데이터가 없음");
          showInfoToast("생성 정보를 찾을 수 없습니다.");
          sessionStorage.removeItem("api_in_progress");
          isApiCalledRef.current = false; // 실패 시 초기화
          router.push("/");
          return;
        }

        const formData = JSON.parse(savedFormData);

        // 재생성인지 확인
        const isRegeneration =
          localStorage.getItem("is_regeneration") === "true";

        // 재생성이 아니고 이미 결과가 있는 경우에만 바로 결과 페이지로 이동
        const existingResult = localStorage.getItem("excuse_result");
        if (existingResult && !isRegeneration) {
          console.log("기존 결과 발견, 결과 페이지로 이동");
          sessionStorage.removeItem("api_in_progress");
          setTimeout(() => {
            router.push("/result");
          }, 500);
          return;
        }

        console.log("재생성 여부:", isRegeneration);

        // value를 label로 변환하는 헬퍼 함수들
        const getTargetLabel = (value: string) => {
          const pickerOptions1 = [
            { label: "상사/선배", value: "상사/선배" },
            { label: "교수/선생님", value: "교수/선생님" },
            { label: "동료/친구", value: "동료/친구" },
            { label: "연인/가족", value: "연인/가족" },
            { label: "기타", value: "기타" },
          ];
          const option = pickerOptions1.find((opt) => opt.value === value);
          return option ? option.label : value;
        };

        const getToneLabel = (value: string) => {
          const pickerOptions2 = [
            { label: "정중하게", value: "정중하게" },
            { label: "친근하게", value: "친근하게" },
            { label: "유머러스하게", value: "유머러스하게" },
            { label: "진지하게", value: "진지하게" },
            { label: "알아서 해줘~", value: "알아서 해줘~" },
          ];
          const option = pickerOptions2.find((opt) => opt.value === value);
          return option ? option.label : value;
        };

        // 재생성인지 확인 (localStorage에서 regeneration 정보 확인)
        const regenerationOption =
          localStorage.getItem("regeneration_option") || "";

        // API 요청 데이터 구성
        const requestData: ExcuseGenerateRequest = {
          situation: formData.situation,
          target: getTargetLabel(formData.target),
          tone: getToneLabel(formData.tone),
          isRegenerated: isRegeneration,
          regeneratedBtnVal: regenerationOption,
          questions: [
            {
              step: 1,
              prompt: "구체적으로 어떤 상황이신가요?",
              answer: formData.situation,
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

        // 로딩 텍스트 애니메이션
        const loadingTexts = ["핑계를 생성중이에요!"];

        let textIndex = 0;
        const textInterval = setInterval(() => {
          textIndex = (textIndex + 1) % loadingTexts.length;
          setLoadingText(loadingTexts[textIndex]);
        }, 2000);

        console.log("API 요청 데이터:", requestData);

        // API 호출
        const response = await generateExcuse(requestData);

        // 결과 데이터를 localStorage에 저장
        localStorage.setItem("excuse_result", JSON.stringify(response));

        // imageKey에 따른 캐릭터 정보도 저장
        if (response.imageKey) {
          const imageKeyToCharacter: { [key: string]: string } = {
            A: "suit",
            B: "default",
            C: "cute",
            D: "kidding",
            E: "cool",
          };
          const characterType =
            imageKeyToCharacter[response.imageKey] || "default";
          localStorage.setItem("character_type", characterType);
        }

        // 재생성 관련 임시 데이터 정리
        localStorage.removeItem("is_regeneration");
        localStorage.removeItem("regeneration_option");

        // 로딩 텍스트 정리
        clearInterval(textInterval);

        // API 호출 완료 - sessionStorage 정리
        sessionStorage.removeItem("api_in_progress");

        // 성공 메시지 표시 후 결과 페이지로 이동
        showInfoToast(
          isRegeneration ? "핑계가 재생성되었습니다!" : "핑계가 생성되었습니다!"
        );
        setTimeout(() => {
          router.push("/result");
        }, 500);
      } catch (error: any) {
        console.error("핑계 생성 실패:", error);

        let errorMessage = "핑계 생성에 실패했습니다. 다시 시도해주세요.";

        if (error.response) {
          console.error("응답 상태:", error.response.status);
          console.error("응답 데이터:", error.response.data);

          if (error.response.status === 400) {
            errorMessage = "요청 데이터가 올바르지 않습니다.";
          } else if (error.response.status === 500) {
            errorMessage = "서버 오류가 발생했습니다.";
          }
        } else if (error.request) {
          console.error("네트워크 오류:", error.request);
          errorMessage = "네트워크 연결을 확인해주세요.";
        }

        showInfoToast(errorMessage);

        // 재생성 관련 임시 데이터 정리
        localStorage.removeItem("is_regeneration");
        localStorage.removeItem("regeneration_option");

        // API 호출 상태 초기화 (재시도 가능하도록)
        setIsApiCalled(false);
        isApiCalledRef.current = false; // useRef도 초기화

        // API 호출 실패 - sessionStorage 정리
        sessionStorage.removeItem("api_in_progress"); // 오류 발생 시 create 페이지로 되돌아가기
        setTimeout(() => {
          router.push("/create");
        }, 1500);
      }
    };

    generateExcuseData();

    // cleanup 함수 - 컴포넌트 언마운트 시 sessionStorage 정리
    return () => {
      sessionStorage.removeItem("api_in_progress");
    };
  }, []); // 의존성 배열 비우기 - 컴포넌트 마운트시에만 실행

  return (
    <div className="flex items-center justify-center">
      <LottieLoading text={loadingText} />
    </div>
  );
}
