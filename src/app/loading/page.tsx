"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LottieLoading from "@/components/LottieLoading";
import { generateExcuse, ExcuseGenerateRequest } from "@/lib/api";
import { useToast } from "@/components/common/Toast";

export default function Loading() {
  const router = useRouter();
  const { showInfoToast } = useToast();
  const [loadingText, setLoadingText] = useState("핑계를 생성중이에요!");

  useEffect(() => {
    // 컴포넌트 마운트 로그
    const componentId = Math.random().toString(36).substr(2, 9);
    console.log(`🚀 Loading 컴포넌트 마운트 [${componentId}]`);

    // 전역 플래그로 추가 보호
    const API_CALL_FLAG = "excuse_api_in_progress";

    // 이미 API 호출이 진행 중인지 확인
    if ((window as any)[API_CALL_FLAG]) {
      console.log(`⏸️ 이미 API 호출이 진행 중입니다 [${componentId}]`);
      return;
    }

    // API 호출 플래그 설정
    (window as any)[API_CALL_FLAG] = true;

    // AbortController를 사용하여 중복 API 호출 방지
    const abortController = new AbortController();

    const generateExcuseData = async () => {
      try {
        console.log(`📞 API 호출 시작 [${componentId}]`);

        // AbortController 상태 확인
        if (abortController.signal.aborted) {
          console.log(`❌ API 호출이 이미 취소됨 [${componentId}]`);
          return;
        }

        // localStorage에서 저장된 폼 데이터 가져오기
        const savedFormData = localStorage.getItem("excuse_form_data");
        if (!savedFormData) {
          console.log(`❌ 폼 데이터가 없음 [${componentId}]`);
          showInfoToast("생성 정보를 찾을 수 없습니다.");
          router.push("/");
          return;
        }

        const formData = JSON.parse(savedFormData);

        // 재생성인지 확인
        const isRegeneration =
          localStorage.getItem("is_regeneration") === "true";

        // 재생성이 아니고 이미 결과가 있는 경우에만 바로 결과 페이지로 이동
        // 단, create 페이지에서 새로운 핑계 생성 시 excuse_result가 삭제되므로
        // 이 로직은 브라우저 뒤로가기 등에서만 작동
        const existingResult = localStorage.getItem("excuse_result");
        if (existingResult && !isRegeneration) {
          console.log(`📋 기존 결과 발견, 결과 페이지로 이동 [${componentId}]`);
          setTimeout(() => {
            const resultData = JSON.parse(existingResult);
            if (resultData.id) {
              router.push(`/result/${resultData.id}`);
            } else {
              router.push("/result");
            }
          }, 500);
          return;
        }

        console.log(`🔄 재생성 여부: ${isRegeneration} [${componentId}]`);
        console.log(`🚀 새로운 API 호출 진행 [${componentId}]`);

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
          // TODO 임시 조치 true
          isRegenerated: true,
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

        console.log(`📤 API 요청 데이터 [${componentId}]:`, requestData);

        // API 호출 전 abort 확인
        if (abortController.signal.aborted) {
          console.log(`❌ API 호출이 취소되었습니다 [${componentId}]`);
          return;
        }

        // API 호출
        console.log(`🌐 generateExcuse API 호출 실행 [${componentId}]`);
        const response = await generateExcuse(requestData);
        console.log(`✅ API 응답 받음 [${componentId}]:`, response);

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

        // API 호출 완료 - 플래그 정리
        (window as any)[API_CALL_FLAG] = false;

        setTimeout(() => {
          // API 응답의 ID를 사용하여 dynamic route로 이동
          if (response.id) {
            router.push(`/result/${response.id}`);
          } else {
            // fallback: ID가 없는 경우 기본 결과 페이지로 이동
            router.push("/result");
          }
        }, 500);
      } catch (error: any) {
        console.error(`❌ 핑계 생성 실패 [${componentId}]:`, error);

        // AbortError 인경우 무시 (정상적인 취소)
        if (error.name === "AbortError") {
          console.log(
            `🚫 API 호출이 정상적으로 취소되었습니다 [${componentId}]`
          );

          // 플래그 정리
          (window as any)[API_CALL_FLAG] = false;

          // AbortError인 경우에도 기존 결과가 있다면 result 페이지로 이동
          const existingResult = localStorage.getItem("excuse_result");
          if (existingResult) {
            try {
              const resultData = JSON.parse(existingResult);
              console.log(
                `📋 AbortError이지만 기존 결과로 이동 [${componentId}]`
              );
              if (resultData.id) {
                router.push(`/result/${resultData.id}`);
              } else {
                router.push("/result");
              }
              return;
            } catch (parseError) {
              console.error(
                `❌ 기존 결과 파싱 오류 [${componentId}]:`,
                parseError
              );
            }
          }

          // 기존 결과가 없는 경우 홈으로 이동
          console.log(
            `🏠 AbortError이고 기존 결과 없음 - 홈으로 이동 [${componentId}]`
          );
          router.push("/");
          return;
        }

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

        // API 호출 실패 - 플래그 정리
        (window as any)[API_CALL_FLAG] = false;
      }
    };

    generateExcuseData();

    // cleanup 함수 - 컴포넌트 언마운트 시 AbortController로 API 호출 취소
    return () => {
      console.log(`🧹 컴포넌트 언마운트 - API 호출 취소 [${componentId}]`);
      abortController.abort();
      // 플래그도 정리
      (window as any)[API_CALL_FLAG] = false;
    };
  }, []); // 의존성 배열 비우기 - 컴포넌트 마운트시에만 실행

  return (
    <div className="flex items-center justify-center">
      <LottieLoading text={loadingText} />
    </div>
  );
}
