import { api, GalleryResponse } from "@/lib/api";
import { mockGalleryData, USE_MOCK_DATA } from "@/lib/mockData";

export const fetchGallery = async (): Promise<GalleryResponse> => {
  // 개발 모드에서 mock 데이터 사용
  if (USE_MOCK_DATA) {
    // 실제 API 호출 시뮬레이션을 위한 지연
    await new Promise((resolve) => setTimeout(resolve, 800));
    return mockGalleryData;
  }

  const response = await api.get<GalleryResponse>("/api/gallery");
  return response.data;
};
