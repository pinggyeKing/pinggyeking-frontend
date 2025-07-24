"use client";

import { useState } from "react";
import SectionIndicator from "@/components/SectionIndicator";
import FunctionIndicator from "@/components/FunctionIndicator";
import TabSection from "@/components/TabSection";
import Message from "@/components/Message";
import {
  Home,
  Users,
  Settings,
  FileText,
  BarChart3,
  Calendar,
  Mail,
  Bell,
} from "lucide-react";

export default function TestPage() {
  // SectionIndicator 테스트용 상태 (index 기반)
  const [sectionIndex, setSectionIndex] = useState(0);

  // TabSection 테스트용 상태
  const [tabSelectedSection, setTabSelectedSection] = useState("home");

  const sectionItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { id: "users", label: "Users", icon: <Users size={20} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Component Test Page
        </h1>

        {/* SectionIndicator 테스트 */}
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">
            SectionIndicator Component
          </h2>
          <p className="text-gray-600 mb-4">
            새로운 디자인의 SectionIndicator 컴포넌트입니다. Index 기반으로
            작동합니다.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <SectionIndicator
              sections={sectionItems}
              activeIndex={sectionIndex}
              onChange={setSectionIndex}
            />
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
            <p className="text-sm text-blue-800">
              <strong>선택된 섹션 인덱스:</strong> {sectionIndex} (
              {sectionItems[sectionIndex]?.label})
            </p>
          </div>

          {/* 사용법 예시 */}
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700">
              사용법 보기
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-x-scroll">
              {`// SectionIndicator 사용법
import SectionIndicator from '@/components/SectionIndicator'
import { Home, Users, Settings } from 'lucide-react'

const [sectionIndex, setSectionIndex] = useState(0)

const sections = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
  { id: 'users', label: 'Users', icon: <Users size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
]

<SectionIndicator
  sections={sections}
  activeIndex={sectionIndex}
  onChange={setSectionIndex}
/>`}
            </pre>
          </details>
        </section>

        {/* FunctionIndicator 테스트 */}
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">
            FunctionIndicator Component
          </h2>
          <p className="text-gray-600 mb-4">
            새로운 디자인의 FunctionIndicator 컴포넌트입니다. 개별적으로
            사용되는 버튼 형태입니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 기본 상태 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">기본 상태</h3>
              <FunctionIndicator
                icon={<Home size={20} />}
                label="Overview"
                onClick={() => console.log("Overview clicked")}
              />
            </div>

            {/* 선택된 상태 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">선택된 상태</h3>
              <FunctionIndicator
                state="selected"
                icon={<FileText size={20} />}
                label="Reports"
                onClick={() => console.log("Reports clicked")}
              />
            </div>

            {/* 자식 요소가 있는 상태 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">자식 요소 포함</h3>
              <FunctionIndicator
                icon={<Calendar size={20} />}
                label="Calendar"
                hasChild={true}
                childLabel="일정 보기"
                onClick={() => console.log("Calendar clicked")}
              />
            </div>

            {/* 비활성화 상태 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">비활성화 상태</h3>
              <FunctionIndicator
                state="disabled"
                icon={<Mail size={20} />}
                label="Mail"
                onClick={() => console.log("Mail clicked")}
              />
            </div>

            {/* 다른 아이콘들 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">다른 아이콘</h3>
              <FunctionIndicator
                icon={<Bell size={20} />}
                label="Notifications"
                hasChild={true}
                onClick={() => console.log("Notifications clicked")}
              />
            </div>

            {/* 사용자 관리 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">사용자 관리</h3>
              <FunctionIndicator
                type="selected"
                icon={<Users size={20} />}
                label="User Management"
                onClick={() => console.log("User Management clicked")}
              />
            </div>
          </div>

          {/* 사용법 예시 */}
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700">
              사용법 보기
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-x-scroll">
              {`// FunctionIndicator 사용법
import FunctionIndicator from '@/components/FunctionIndicator'
import { Home } from 'lucide-react'

// 기본 사용법
<FunctionIndicator
  icon={<Home size={20} />}
  label="Overview"
  onClick={() => console.log('clicked')}
/>

// 선택된 상태
<FunctionIndicator
  state="selected"
  icon={<Home size={20} />}
  label="Overview"
  onClick={() => console.log('clicked')}
/>

// 자식 요소 포함
<FunctionIndicator
  icon={<Home size={20} />}
  label="Overview"
  hasChild={true}
  childLabel="자세히 보기"
  onClick={() => console.log('clicked')}
/>`}
            </pre>
          </details>
        </section>

        {/* Message 테스트 */}
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Message Component</h2>
          <p className="text-gray-600 mb-4">
            새로운 Message 컴포넌트입니다. Hint, Success, Warning, Error 4가지
            타입을 지원합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hint 메시지 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">Hint Message</h3>
              <Message
                type="hint"
                message="이것은 정보 메시지입니다. 사용자에게 도움이 되는 정보를 제공합니다."
              />
            </div>

            {/* Success 메시지 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">Success Message</h3>
              <Message
                type="success"
                message="작업이 성공적으로 완료되었습니다!"
              />
            </div>

            {/* Warning 메시지 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">Warning Message</h3>
              <Message
                type="warning"
                message="주의: 이 작업을 수행하기 전에 확인해주세요."
              />
            </div>

            {/* Error 메시지 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">Error Message</h3>
              <Message
                type="error"
                message="오류가 발생했습니다. 다시 시도해주세요."
              />
            </div>
          </div>

          {/* 실제 사용 예시 */}
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3">실제 사용 예시</h3>
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="border-b pb-2">
                <p className="text-xs text-gray-500 mb-1">로그인 폼 검증</p>
                <Message
                  type="error"
                  message="이메일 주소를 올바르게 입력해주세요."
                />
              </div>
              <div className="border-b pb-2">
                <p className="text-xs text-gray-500 mb-1">파일 업로드</p>
                <Message
                  type="success"
                  message="파일이 성공적으로 업로드되었습니다."
                />
              </div>
              <div className="border-b pb-2">
                <p className="text-xs text-gray-500 mb-1">설정 변경</p>
                <Message
                  type="warning"
                  message="변경사항을 저장하려면 저장 버튼을 클릭하세요."
                />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">도움말</p>
                <Message
                  type="hint"
                  message="비밀번호는 8자 이상이어야 합니다."
                />
              </div>
            </div>
          </div>

          {/* 사용법 예시 */}
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700">
              사용법 보기
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-x-scroll">
              {`// Message 사용법
import Message from '@/components/Message'

// 기본 사용법 (hint 타입)
<Message message="도움이 되는 정보입니다." />

// Success 메시지
<Message 
  type="success" 
  message="작업이 성공적으로 완료되었습니다!" 
/>

// Warning 메시지
<Message 
  type="warning" 
  message="주의: 이 작업을 수행하기 전에 확인해주세요." 
/>

// Error 메시지
<Message 
  type="error" 
  message="오류가 발생했습니다. 다시 시도해주세요." 
/>

// 커스텀 클래스 적용
<Message 
  type="hint"
  message="커스텀 스타일이 적용된 메시지"
  className="my-4"
/>`}
            </pre>
          </details>
        </section>

        {/* 컴포넌트 상태 요약 */}
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Current State Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900">SectionIndicator</h3>
              <p className="text-sm text-blue-700">
                Selected Index: {sectionIndex}
              </p>
              <p className="text-sm text-blue-700">
                Selected Label: {sectionItems[sectionIndex]?.label}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900">FunctionIndicator</h3>
              <p className="text-sm text-green-700">
                Individual button components
              </p>
              <p className="text-sm text-green-700">
                Check console for click events
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-900">Message</h3>
              <p className="text-sm text-purple-700">
                4 types: hint, success, warning, error
              </p>
              <p className="text-sm text-purple-700">
                Lucide icons with color coding
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Test Section */}
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Interactive Test</h2>
          <p className="text-gray-600 mb-4">
            아래 버튼들을 클릭해서 SectionIndicator의 상태를 변경해보세요.
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {sectionItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSectionIndex(index)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  sectionIndex === index
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              현재 선택된 섹션:{" "}
              <strong>{sectionItems[sectionIndex]?.label}</strong> (인덱스:{" "}
              {sectionIndex})
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
