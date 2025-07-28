"use client";

import { Carousel } from "./components";

export default function Page() {
  const handleSelectionChange = (selectedId: string) => {
    console.log("Selected character style:", selectedId);
  };

  return (
    <div className="min-h-screen bg-grey-1 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-screen-title text-grey-10 mb-8 text-center">
          이미지 만들기 페이지
        </h1>

        <div className="bg-white rounded-24 shadow-main overflow-x-scroll p-4">
          <h2 className="text-section-title text-grey-10 mb-6 text-center">
            캐릭터 스타일 선택
          </h2>

          <Carousel
            onSelectionChange={handleSelectionChange}
            initialSelected="default"
          />
        </div>
      </div>
    </div>
  );
}
