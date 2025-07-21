'use client';

import React, { useState } from 'react';
import SearchBar from '@/components/inputs/SearchBar';
import { TextBox } from '@/components/inputs/TextBox';

function Dashboard() {
  // SearchBar 상태
  const [search, setSearch] = useState('');
  // TextBox 예시 데이터
  const messages = [
    { value: '안녕하세요!', author: 'you' as const, time: '오전 9:00' },
    { value: '반가워요!', author: 'me' as const, time: '오전 9:01' },
    {
      value: '이 컴포넌트는 피그마 디자인을 반영했습니다.',
      author: 'you' as const,
      time: '오전 9:02',
    },
    {
      value: '네, Tailwind로 만들었어요.',
      author: 'me' as const,
      time: '오전 9:03',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* 다양한 TextBox 상태 예시 */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">TextBox 다양한 상태 예시</h2>
        <div className="flex flex-wrap gap-4">
          <div className="min-w-[300px] flex-1">
            <TextBox
              value="기본 상태"
              author="you"
              time="오전 9:10"
              status="default"
            />
          </div>
          <div className="min-w-[300px] flex-1">
            <TextBox
              value="포커스(클릭) 상태"
              author="me"
              time="오전 9:11"
              status="clicked"
            />
          </div>
          <div className="min-w-[300px] flex-1">
            <TextBox
              value="입력 완료 상태"
              author="you"
              time="오전 9:12"
              status="inputed"
            />
          </div>
          <div className="min-w-[300px] flex-1">
            <TextBox
              value="에러 상태"
              author="me"
              time="오전 9:13"
              error="에러 메시지 예시"
              status="error"
            />
          </div>
          <div className="min-w-[300px] flex-1">
            <TextBox
              value="성공 상태"
              author="you"
              time="오전 9:14"
              status="success"
            />
          </div>
        </div>
      </div>

      {/* SearchBar 사용 예시 */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">SearchBar 컴포넌트 예시</h2>
        <SearchBar
          value={search}
          onChange={setSearch}
          onSearch={(v) => alert(`검색: ${v}`)}
          placeholder="메시지 검색..."
        />
      </div>

      {/* 이하 기존 내용 */}
      <div className="bg-blue-1 p-4 rounded mb-4">
        <h1 className="text-2xl font-bold">폰트 테스트</h1>
      </div>

      {/* Ownglyph PDH 폰트 테스트 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Ownglyph PDH 폰트</h2>
        <div className="text-extra-title bg-yellow-1 p-4 rounded">
          온글잎 PDH - Extra Title (58px)
        </div>
        <div className="text-screen-title bg-blue-1 p-4 rounded">
          온글잎 PDH - Screen Title (42px)
        </div>
      </div>

      {/* Ownglyph RDO 폰트 테스트 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Ownglyph RDO ballpen 폰트</h2>
        <div className="text-screen-subtitle bg-orange-1 p-4 rounded">
          온글잎 RDO - Screen Subtitle (28px)
        </div>
        <div className="text-section-title bg-green-1 p-4 rounded">
          온글잎 RDO - Section Title (26px)
        </div>
        <div className="text-section-subtitle bg-teal-1 p-4 rounded">
          온글잎 RDO - Section Subtitle (18px)
        </div>
      </div>

      {/* Pretendard 폰트 테스트 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Pretendard 폰트</h2>
        <div className="text-group-title bg-grey-1 p-4 rounded">
          Pretendard - Group Title (16px, 600)
        </div>
        <div className="text-group-subtitle bg-grey-2 p-4 rounded">
          Pretendard - Group Subtitle (14px, 500)
        </div>
        <div className="text-body1-regular bg-grey-1 p-4 rounded">
          Pretendard - Body1 Regular (18px, 400)
        </div>
        <div className="text-body2-medium bg-grey-2 p-4 rounded">
          Pretendard - Body2 Medium (16px, 500)
        </div>
        <div className="text-body3-semibold bg-grey-1 p-4 rounded">
          Pretendard - Body3 SemiBold (14px, 600)
        </div>
        <div className="text-body4-regular bg-grey-2 p-4 rounded">
          Pretendard - Body4 Regular (12px, 400)
        </div>
      </div>

      {/* 색상 테스트 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">색상 테스트</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-yellow-3 text-yellow-5 p-4 rounded text-center">
            Yellow
          </div>
          <div className="bg-orange-3 text-orange-5 p-4 rounded text-center">
            Orange
          </div>
          <div className="bg-red-3 text-red-5 p-4 rounded text-center">Red</div>
          <div className="bg-blue-3 text-blue-5 p-4 rounded text-center">
            Blue
          </div>
          <div className="bg-teal-3 text-teal-5 p-4 rounded text-center">
            Teal
          </div>
          <div className="bg-green-3 text-green-5 p-4 rounded text-center">
            Green
          </div>
        </div>
      </div>

      {/* 디버깅 정보 */}
      <div className="space-y-4 border-t pt-4">
        <h2 className="text-xl font-semibold">디버깅 정보</h2>
        <div className="text-sm text-grey-7 space-y-2">
          <p>폰트가 로드되지 않으면 브라우저 개발자 도구에서 확인하세요:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Network 탭에서 폰트 파일 로딩 상태 확인</li>
            <li>Console에서 폰트 관련 오류 확인</li>
            <li>Elements 탭에서 computed styles 확인</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
