'use client';

import React from 'react';
import Picker from '@/components/picker/Picker';

function Dashboard() {
  const [pickerValue, setPickerValue] = React.useState('a');
  const pickerOptions = [
    { label: '옵션 A', value: 'a' },
    { label: '옵션 B', value: 'b' },
    { label: '옵션 C (비활성화)', value: 'c', disabled: true },
    { label: '옵션 D', value: 'd' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="bg-blue-1 p-4 rounded mb-4">
        <h1 className="text-2xl font-bold">폰트 테스트</h1>
      </div>

      {/* Picker 컴포넌트 예시 */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Picker 컴포넌트 예시</h2>
        <Picker
          options={pickerOptions}
          value={pickerValue}
          onChange={setPickerValue}
        />
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
