import { ExcuseDetailResponse, GalleryResponse } from "./api";

// Mock 데이터 - 개발/테스트용
export const mockExcuseDetail: ExcuseDetailResponse = {
  situation: "내일 회식에 참석하지 못할 것 같습니다",
  target: "부장님",
  tone: "정중하고 죄송한",
  excuse:
    "갑자기 가족이 응급실에 실려가서 병원에 가야 할 상황이 생겼습니다. 정말 중요한 자리인 것은 알고 있지만, 어쩔 수 없는 상황이라 양해 부탁드립니다.",
};

export const mockGalleryData: GalleryResponse = {
  totalExcuses: 11,
  averageSatisfaction: 7.09,
  regenerationRate: 45.45,
  peakTime: {
    hour: 14,
    count: 7,
  },
};

// 개발 모드에서 mock 데이터 사용 여부
// export const USE_MOCK_DATA = process.env.NODE_ENV === "development";
export const USE_MOCK_DATA = false;
