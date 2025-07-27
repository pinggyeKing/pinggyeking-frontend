"use client";

import React, { useState } from "react";
import ShareKakaoButton from "@/components/ShareKakaoButton";

export default function KakaoShareTestPage() {
  const [imageUrl, setImageUrl] = useState(
    "https://via.placeholder.com/400x300.png?text=변명+연구소",
  );
  const [title, setTitle] = useState("변명 연구소에서 만든 나만의 핑계");
  const [description, setDescription] = useState(
    "AI가 만들어준 완벽한 핑계를 확인해보세요!",
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          카카오톡 공유하기 테스트
        </h1>

        {/* 환경변수 설정 안내 */}
        <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-8">
          <h2 className="font-semibold text-yellow-800 mb-2">
            🔑 설정 필요사항
          </h2>
          <p className="text-yellow-700 text-sm">
            카카오톡 공유 기능을 사용하려면 환경변수에 카카오 앱 키를 설정해야
            합니다:
          </p>
          <code className="block bg-yellow-200 p-2 mt-2 rounded text-sm">
            .env.local 파일에 추가:
            NEXT_PUBLIC_KAKAO_APP_KEY=your_kakao_javascript_key
          </code>
          <p className="text-yellow-700 text-xs mt-2">
            카카오 개발자 콘솔(https://developers.kakao.com)에서 앱을 생성하고
            JavaScript 키를 발급받으세요.
          </p>
        </div>

        {/* 이미지 공유 테스트 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📸 이미지 공유 테스트</h2>

          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이미지 URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="공유할 이미지 URL을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="공유할 때 표시될 제목"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows={3}
                placeholder="공유할 때 표시될 설명"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <ShareKakaoButton
              type="image"
              imageUrl={imageUrl}
              resultTitle={title}
              resultDescription={description}
            />

            <ShareKakaoButton
              type="text"
              title={title}
              description={description}
              className="bg-blue-400 hover:bg-blue-500"
            >
              텍스트로 공유
            </ShareKakaoButton>
          </div>
        </div>

        {/* 미리보기 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">👀 공유 미리보기</h2>

          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex gap-4">
              <img
                src={imageUrl}
                alt="미리보기"
                className="w-20 h-20 object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/Logo.svg";
                }}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-600 text-sm mb-2">{description}</p>
                <p className="text-gray-400 text-xs">
                  {window.location.origin}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 사용법 안내 */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">📚 사용법</h2>

          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">1. 기본 사용법</h3>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                {`import ShareKakaoButton from '@/components/ShareKakaoButton';

// 이미지 공유
<ShareKakaoButton
  type="image"
  imageUrl="https://example.com/image.jpg"
  resultTitle="제목"
  resultDescription="설명"
/>

// 텍스트 공유
<ShareKakaoButton
  type="text"
  title="제목"
  description="설명"
  thumbnailUrl="https://example.com/thumbnail.jpg"
/>`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                2. 직접 함수 호출
              </h3>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                {`import { shareImageResult, shareTextResult } from '@/app/result/create-image/utils';

// 이미지 공유
const success = await shareImageResult(
  'https://example.com/image.jpg',
  '제목',
  '설명'
);

// 텍스트 공유
const success = await shareTextResult(
  '제목',
  '설명',
  'https://example.com/thumbnail.jpg'
);`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
