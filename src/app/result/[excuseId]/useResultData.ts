// result 페이지 데이터 로딩 관련 커스텀 훅

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ExcuseGenerateResponse } from "@/lib/api";
import { ResultState } from "./types";
import { getExcuseResult, getCharacterTypeFromImageKey } from "./utils";

export const useResultData = (excuseId: string) => {
  const router = useRouter();
  const [state, setState] = useState<ResultState>({
    resultText: "",
    characterType: "default",
    excuseData: null,
    isLoading: true,
  });

  useEffect(() => {
    const loadExcuseData = () => {
      if (typeof window !== "undefined") {
        const resultData = getExcuseResult();

        if (resultData && resultData.id.toString() === excuseId) {
          const characterType = resultData.imageKey
            ? getCharacterTypeFromImageKey(resultData.imageKey)
            : "default";

          setState({
            resultText: resultData.excuse.excuse,
            characterType,
            excuseData: resultData,
            isLoading: false,
          });
          return;
        }

        // 저장된 결과가 없거나 ID가 일치하지 않으면 홈으로 리다이렉트
        console.log("일치하는 결과를 찾을 수 없습니다. 홈으로 이동합니다.");
        router.push("/");
      }
    };

    loadExcuseData();
  }, [excuseId, router]);

  return state;
};
