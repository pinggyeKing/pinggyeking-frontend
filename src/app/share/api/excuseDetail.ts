import { api, ExcuseDetailResponse } from "@/lib/api";
import { mockExcuseDetail, USE_MOCK_DATA } from "@/lib/mockData";

export const fetchExcuseDetail = async (
  excuseId: string,
): Promise<ExcuseDetailResponse> => {
  // 개발 모드에서 mock 데이터 사용
  if (USE_MOCK_DATA) {
    // 실제 API 호출 시뮬레이션을 위한 지연
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockExcuseDetail;
  }

  const response = await api.get<ExcuseDetailResponse>(
    `/api/excuses/${excuseId}/detail`,
  );
  return response.data;
};
