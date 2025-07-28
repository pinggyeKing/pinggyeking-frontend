"use client";

import { Carousel } from "./components";

export default function Page() {
  const handleSelectionChange = (selectedId: string) => {
    console.log("Selected character style:", selectedId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          이미지 만들기 페이지
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-6 text-center">
            캐릭터 스타일 선택
          </h2>

          <Carousel
            onSelectionChange={handleSelectionChange}
            initialSelected="basic"
          />
        </div>
      </div>
    </div>
  );
}
