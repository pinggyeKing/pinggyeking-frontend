"use client";

import React, { useState, useRef } from "react";
import ShareKakaoButton from "@/components/ShareKakaoButton";
import CopyLinkButton from "@/components/CopyLinkButton";
import DownloadImageButton from "@/components/DownloadImageButton";

export default function KakaoShareTestPage() {
  const [imageUrl, setImageUrl] = useState(
    "https://via.placeholder.com/400x300.png?text=변명+연구소",
  );
  const [title, setTitle] = useState("변명 연구소에서 만든 나만의 핑계");
  const [description, setDescription] = useState(
    "AI가 만들어준 완벽한 핑계를 확인해보세요!",
  );
  const [customLink, setCustomLink] = useState("https://example.com");
  const [resultId, setResultId] = useState("test-result-123");
  const [downloadFileName, setDownloadFileName] = useState("변명연구소_결과");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          공유 및 다운로드 기능 테스트 페이지
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

        {/* 링크 복사 테스트 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">🔗 링크 복사 테스트</h2>

          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                커스텀 링크
              </label>
              <input
                type="url"
                value={customLink}
                onChange={(e) => setCustomLink(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="복사할 링크를 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                결과 ID (결과 링크 생성용)
              </label>
              <input
                type="text"
                value={resultId}
                onChange={(e) => setResultId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="결과 ID를 입력하세요"
              />
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <CopyLinkButton
              type="custom"
              link={customLink}
              successMessage="커스텀 링크가 복사되었습니다!"
            >
              커스텀 링크 복사
            </CopyLinkButton>

            <CopyLinkButton
              type="current"
              className="bg-blue-100 hover:bg-blue-200 text-blue-700"
              successMessage="현재 페이지 링크가 복사되었습니다!"
            >
              현재 페이지 복사
            </CopyLinkButton>

            <CopyLinkButton
              type="result"
              resultId={resultId}
              className="bg-purple-100 hover:bg-purple-200 text-purple-700"
              successMessage="결과 링크가 복사되었습니다!"
            >
              결과 링크 복사
            </CopyLinkButton>
          </div>
        </div>

        {/* 이미지 다운로드 테스트 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            💾 이미지 다운로드 테스트
          </h2>

          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                저장할 파일명
              </label>
              <input
                type="text"
                value={downloadFileName}
                onChange={(e) => setDownloadFileName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="저장할 파일명을 입력하세요 (확장자 제외)"
              />
            </div>
          </div>

          <div className="flex gap-4 flex-wrap mb-6">
            <DownloadImageButton
              type="url"
              imageUrl={imageUrl}
              fileName={downloadFileName}
              successMessage="이미지가 저장되었어요!"
            >
              URL 이미지 저장
            </DownloadImageButton>

            <DownloadImageButton
              type="url"
              imageUrl="/Logo.svg"
              fileName="로고_이미지"
              className="bg-green-500 hover:bg-green-600"
              successMessage="로고가 저장되었어요!"
            >
              로고 저장
            </DownloadImageButton>
          </div>

          {/* Canvas 테스트용 */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Canvas 테스트
            </h3>
            <canvas
              ref={canvasRef}
              width="440"
              height="490"
              className="border border-gray-300 rounded"
              style={{
                backgroundColor: "#f0f0f0",
                backgroundImage: "url(/Logo.svg)",
              }}
            />
            <div className="mt-2">
              <DownloadImageButton
                type="canvas"
                canvasRef={canvasRef}
                fileName="canvas_테스트"
                className="bg-purple-500 hover:bg-purple-600"
              >
                Canvas 저장
              </DownloadImageButton>
            </div>
          </div>

          {/* Element 테스트용 */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Element 테스트
            </h3>
            <div
              ref={elementRef}
              className="border border-gray-300 rounded p-4 bg-white"
              style={{ width: "200px", height: "100px" }}
            >
              <div className="text-center">
                <h4 className="font-bold text-gray-900">테스트 카드</h4>
                <p className="text-sm text-gray-600">이 요소를 이미지로 저장</p>
              </div>
            </div>
            <div className="mt-2">
              <DownloadImageButton
                type="element"
                elementRef={elementRef}
                fileName="element_테스트"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Element 저장
              </DownloadImageButton>
            </div>
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
              <h3 className="font-medium text-gray-900 mb-2">
                1. 카카오톡 공유 - 컴포넌트 사용
              </h3>
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
                2. 카카오톡 공유 - 직접 함수 호출
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

            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                3. 링크 복사 - 컴포넌트 사용
              </h3>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                {`import CopyLinkButton from '@/components/CopyLinkButton';

// 커스텀 링크 복사 (파라미터로 링크 전달)
<CopyLinkButton
  type="custom"
  link="https://example.com"
  successMessage="링크가 복사되었습니다!"
/>

// 현재 페이지 URL 복사
<CopyLinkButton
  type="current"
  successMessage="현재 페이지가 복사되었습니다!"
/>

// 결과 ID가 포함된 링크 복사
<CopyLinkButton
  type="result"
  resultId="test-123"
  baseUrl="https://example.com"
/>`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                4. 링크 복사 - 직접 함수 호출
              </h3>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                {`import { 
  copyCustomLink, 
  copyCurrentUrl, 
  copyResultLink 
} from '@/app/result/create-image/utils';

// 커스텀 링크 복사 (파라미터로 링크 전달)
const success1 = await copyCustomLink(
  'https://example.com',
  '성공 메시지',
  '에러 메시지'
);

// 현재 페이지 URL 복사
const success2 = await copyCurrentUrl();

// 결과 링크 생성 및 복사
const success3 = await copyResultLink(
  'result-id',
  'https://base-url.com'
);`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                5. 이미지 다운로드 - 컴포넌트 사용
              </h3>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                {`import DownloadImageButton from '@/components/DownloadImageButton';

// URL 이미지 다운로드
<DownloadImageButton
  type="url"
  imageUrl="https://example.com/image.jpg"
  fileName="변명연구소_결과"
  successMessage="이미지가 저장되었어요!"
/>

// Canvas 다운로드
<DownloadImageButton
  type="canvas"
  canvasRef={canvasRef}
  fileName="canvas_이미지"
/>

// Element 다운로드 (html2canvas 필요)
<DownloadImageButton
  type="element"
  elementRef={elementRef}
  fileName="element_이미지"
/>`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                6. 이미지 다운로드 - 직접 함수 호출
              </h3>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                {`import { 
  downloadImage, 
  downloadCanvasAsJPG, 
  downloadElementAsJPG 
} from '@/app/result/create-image/utils';

// URL 이미지 다운로드
const success1 = await downloadImage(
  'https://example.com/image.jpg',
  '변명연구소_결과.jpg',
  '이미지가 저장되었어요!'
);

// Canvas 다운로드
const success2 = await downloadCanvasAsJPG(
  canvasElement,
  'canvas_이미지.jpg'
);

// Element 다운로드 (html2canvas 필요)
const success3 = await downloadElementAsJPG(
  element,
  'element_이미지.jpg'
);`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
