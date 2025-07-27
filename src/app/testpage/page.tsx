"use client";

import { useEffect, useState } from "react";
import styles from "./testpage.module.scss";
import Checkbox from "@/components/inputs/Checkbox";
import Radio from "@/components/inputs/Radio";
import Toggle from "@/components/inputs/Toggle";
import TextBox from "@/components/inputs/TextBox/TextBox";

import SectionIndicator from "@/components/SectionIndicator";
import FunctionIndicator from "@/components/FunctionIndicator";
import TabSection from "@/components/TabSection";
import Message from "@/components/Message";
import ProgressBar from "@/components/ProgressBar";
import Radius from "@/components/Radius";
import LottieLoading from "@/components/LottieLoading";
import Picker from "@/components/picker/Picker";
import type { PickerOption } from "@/components/picker/Picker";
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
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const [textValue, setTextValue] = useState(
    "안녕하세요! 이것은 TextBox 컴포넌트 예시입니다.",
  );
  const [numberValue, setNumberValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [toggleValue, setToggleValue] = useState(false);
  // SectionIndicator 테스트용 상태 (index 기반)
  const [sectionIndex, setSectionIndex] = useState(0);

  // TabSection 테스트용 상태
  const [tabSelectedSection, setTabSelectedSection] = useState("home");

  // Progress Bar 테스트용 상태 (단계별)
  const [progressStage, setProgressStage] = useState<20 | 40 | 60 | 80 | 100>(
    60,
  );

  // Radius 테스트용 상태
  const [radiusValue, setRadiusValue] = useState(80);

  // Picker 테스트용 상태
  const [basicPickerValue, setBasicPickerValue] = useState("option2");
  const [colorPickerValue, setColorPickerValue] = useState("blue");
  const [sizePickerValue, setSizePickerValue] = useState("medium");
  const [languagePickerValue, setLanguagePickerValue] = useState("korean");
  const [dynamicPickerValue, setDynamicPickerValue] = useState("pizza");
  useEffect(() => {
    // 폰트 로딩 상태 확인
    const checkFontLoading = async () => {
      try {
        await document.fonts.ready;
        const fontFaces = Array.from(document.fonts);
        const ownglyphFont = fontFaces.find(
          (font) => font.family === "Ownglyph PDH",
        );
        setFontLoaded(!!ownglyphFont && ownglyphFont.status === "loaded");
        console.log("Font loading status:", {
          ready: true,
          ownglyphFound: !!ownglyphFont,
          status: ownglyphFont?.status,
          allFonts: fontFaces.map((f) => ({
            family: f.family,
            status: f.status,
          })),
        });
      } catch (error) {
        console.error("Font loading check failed:", error);
      }
    };

    checkFontLoading();
  }, []);

  const characters = [
    "default",
    "excited",
    "kidding",
    "sad",
    "cute",
    "cool",
    "crown",
    "suit",
  ] as const;

  const bubblePositions = ["top", "bottom", "left", "right"] as const;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberValue(e.target.value);
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(e.target.checked);
  };
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };
  const sectionItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { id: "users", label: "Users", icon: <Users size={20} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  // Picker 옵션들 정의
  const basicOptions: PickerOption[] = [
    { label: "첫 번째 옵션", value: "option1" },
    { label: "두 번째 옵션", value: "option2" },
    { label: "세 번째 옵션", value: "option3" },
    { label: "비활성화된 옵션", value: "option4", disabled: true },
  ];

  const colorOptions: PickerOption[] = [
    { label: "빨간색", value: "red" },
    { label: "파란색", value: "blue" },
    { label: "초록색", value: "green" },
    { label: "노란색", value: "yellow" },
    { label: "보라색", value: "purple" },
  ];

  const sizeOptions: PickerOption[] = [
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
    { label: "Extra Large", value: "xl" },
  ];

  const languageOptions: PickerOption[] = [
    { label: "한국어", value: "korean" },
    { label: "English", value: "english" },
    { label: "日本語", value: "japanese" },
    { label: "中文", value: "chinese", disabled: true },
    { label: "Français", value: "french" },
    { label: "Español", value: "spanish" },
  ];

  const longTextOptions: PickerOption[] = [
    { label: "짧은 옵션", value: "short" },
    { label: "조금 더 긴 옵션 텍스트입니다", value: "medium" },
    {
      label:
        "이것은 매우 긴 옵션 텍스트로 UI에서 어떻게 표시되는지 확인하기 위한 예시입니다",
      value: "long",
    },
    { label: "일반 길이", value: "normal" },
  ];

  const dynamicOptions: PickerOption[] = [
    { label: "🍕 피자", value: "pizza" },
    { label: "🍔 햄버거", value: "burger" },
    { label: "🍜 라면", value: "ramen" },
    { label: "🍣 초밥", value: "sushi" },
    { label: "🥗 샐러드", value: "salad", disabled: true },
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
          <div>
            <p className="text-sm text-grey-6 mb-2">CSS 변수 사용:</p>
            <p
              style={{
                fontFamily: "var(--font-ownglyph-pdh)",
                fontSize: "30px",
              }}
            >
              에에... 그게...
            </p>
          </div>
          <div>
            <p className="text-sm text-grey-6 mb-2">CSS 클래스 사용:</p>
            <p className="text-speech-bubble">에에... 그게...</p>
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

        {/* ProgressBar 테스트 */}
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">ProgressBar Component</h2>
          <p className="text-gray-600 mb-4">
            Figma 디자인에서 직접 다운로드한 SVG 이미지를 사용하는 ProgressBar
            컴포넌트입니다. 직선(straight)과 곡선(curved) 두 가지 스타일을
            지원하며, 20%, 40%, 60%, 80%, 100% 단계마다 연필 아이콘이 정확히
            표시됩니다. 각 단계별로 완성된 SVG를 사용하므로 디자인과 100%
            일치합니다.
          </p>

          <div className="space-y-8">
            {/* 단계 선택 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">단계 선택</h3>
              <div className="flex flex-wrap gap-2">
                {([20, 40, 60, 80, 100] as const).map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setProgressStage(stage)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      progressStage === stage
                        ? "bg-gray-800 text-white border-gray-800"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {stage}%
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                현재 선택된 단계: <strong>{progressStage}%</strong>
              </p>
            </div>

            {/* Straight 스타일 (Figma의 Style 1) */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium mb-4">
                Straight Style (둥근 진행률 바)
              </h3>
              <div className="bg-white p-6 rounded-lg border">
                <ProgressBar stage={progressStage} style="straight" />
              </div>
            </div>

            {/* Curved 스타일 (Figma의 Style 2) */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium mb-4">
                Curved Style (직선 진행률 바)
              </h3>
              <div className="bg-white p-6 rounded-lg border">
                <ProgressBar stage={progressStage} style="curved" />
              </div>
            </div>

            {/* 모든 단계 비교 - Straight */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium mb-4">
                모든 단계 비교 (Straight Style)
              </h3>
              <div className="space-y-6">
                {([20, 40, 60, 80, 100] as const).map((stage) => (
                  <div key={stage} className="bg-white p-4 rounded-lg border">
                    <p className="text-sm text-gray-600 mb-3 font-medium">
                      {stage}% 단계
                    </p>
                    <ProgressBar stage={stage} style="straight" />
                  </div>
                ))}
              </div>
            </div>

            {/* 모든 단계 비교 - Curved */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium mb-4">
                모든 단계 비교 (Curved Style)
              </h3>
              <div className="space-y-6">
                {([20, 40, 60, 80, 100] as const).map((stage) => (
                  <div key={stage} className="bg-white p-4 rounded-lg border">
                    <p className="text-sm text-gray-600 mb-3 font-medium">
                      {stage}% 단계
                    </p>
                    <ProgressBar stage={stage} style="curved" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 사용법 예시 */}
          <details className="mt-6">
            <summary className="cursor-pointer text-sm font-medium text-gray-700">
              사용법 보기
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-x-scroll">
              {`// ProgressBar 사용법 (Figma 디자인 기반)
import ProgressBar from '@/components/ProgressBar'
import type { ProgressStage } from '@/components/ProgressBar'

// 기본 사용법 (straight 스타일 - 둥근 진행률 바)
<ProgressBar stage={60} />

// Straight 스타일 (둥근 진행률 바)
<ProgressBar 
  stage={80} 
  style="straight" 
/>

// Curved 스타일 (직선 진행률 바)
<ProgressBar 
  stage={60} 
  style="curved" 
/>

// 허용되는 단계: 20, 40, 60, 80, 100
const stages: ProgressStage[] = [20, 40, 60, 80, 100]

// 각 단계마다 연필 아이콘이 자동으로 표시됩니다
// 완성된 단계에만 연필 아이콘이 나타납니다

// 커스텀 클래스 적용
<ProgressBar 
  stage={100}
  style="straight"
  className="my-4"
/>`}
            </pre>
          </details>
        </section>

        {/* LottieLoading 테스트 */}
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">
            LottieLoading Component
          </h2>
          <p className="text-gray-600 mb-4">
            Figma 디자인에서 받은 JSON 파일을 활용한 Lottie 애니메이션 로딩
            컴포넌트입니다. 복잡하고 부드러운 벡터 애니메이션을 제공하며, 3가지
            크기와 선택적 텍스트 표시를 지원합니다.
          </p>

          <div className="space-y-8">
            {/* 다양한 크기 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium mb-4">다양한 크기</h3>
              <div className="flex items-center justify-around gap-8">
                <div className="text-center">
                  <LottieLoading size="small" />
                  <p className="text-xs text-gray-500 mt-2">Small</p>
                </div>
                <div className="text-center">
                  <LottieLoading size="medium" />
                  <p className="text-xs text-gray-500 mt-2">Medium (기본)</p>
                </div>
                <div className="text-center">
                  <LottieLoading size="large" />
                  <p className="text-xs text-gray-500 mt-2">Large</p>
                </div>
              </div>
            </div>

            {/* 텍스트와 함께 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium mb-4">텍스트와 함께</h3>
              <div className="flex items-center justify-around gap-8">
                <div className="text-center">
                  <LottieLoading size="small" text="잠시만 기다려주세요..." />
                </div>
                <div className="text-center">
                  <LottieLoading
                    size="medium"
                    text="데이터를 불러오고 있어요!"
                  />
                </div>
                <div className="text-center">
                  <LottieLoading size="large" text="곧 완료됩니다!" />
                </div>
              </div>
            </div>

            {/* 실제 사용 예시 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium mb-4">실제 사용 예시</h3>
              <div className="space-y-6">
                {/* 페이지 전체 로딩 */}
                <div className="bg-white p-8 rounded-lg border min-h-48 flex flex-col items-center justify-center">
                  <LottieLoading
                    size="large"
                    text="페이지를 준비하고 있어요!"
                  />
                </div>

                {/* 작은 로딩 영역 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-lg border text-center">
                    <h4 className="text-sm font-medium mb-4">데이터 처리 중</h4>
                    <LottieLoading size="small" text="분석하고 있어요..." />
                  </div>
                  <div className="bg-white p-6 rounded-lg border text-center">
                    <h4 className="text-sm font-medium mb-4">업로드 중</h4>
                    <LottieLoading
                      size="small"
                      text="파일을 업로드하고 있어요!"
                    />
                  </div>
                </div>

                {/* 버튼 내 로딩 */}
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2">
                    <LottieLoading size="small" />
                    저장 중...
                  </button>
                  <button className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center gap-2">
                    <LottieLoading size="small" />
                    업로드 중...
                  </button>
                </div>
              </div>
            </div>

            {/* 다양한 배경에서의 표시 */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">다양한 배경에서의 표시</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 밝은 배경 */}
                <div className="bg-white p-6 rounded-lg border text-center">
                  <h4 className="text-sm font-medium mb-3">밝은 배경</h4>
                  <LottieLoading size="medium" text="로딩 중..." />
                </div>

                {/* 회색 배경 */}
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                  <h4 className="text-sm font-medium mb-3">회색 배경</h4>
                  <LottieLoading size="medium" text="로딩 중..." />
                </div>

                {/* 어두운 배경 */}
                <div className="bg-gray-800 p-6 rounded-lg text-center">
                  <h4 className="text-sm font-medium mb-3 text-white">
                    어두운 배경
                  </h4>
                  <LottieLoading
                    size="medium"
                    text="로딩 중..."
                    className="text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 사용법 예시 */}
          <details className="mt-6">
            <summary className="cursor-pointer text-sm font-medium text-gray-700">
              사용법 보기
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-x-scroll">
              {`// LottieLoading 사용법
import LottieLoading from '@/components/LottieLoading'

// 기본 사용법
<LottieLoading />

// 크기 지정
<LottieLoading size="small" />
<LottieLoading size="medium" />
<LottieLoading size="large" />

// 텍스트와 함께
<LottieLoading 
  size="medium" 
  text="데이터를 불러오고 있어요!" 
/>

// 모든 옵션 조합
<LottieLoading 
  size="large"
  text="페이지를 준비하고 있어요!"
  className="my-4"
/>

// 페이지 전체 로딩
<div className="min-h-screen flex items-center justify-center">
  <LottieLoading 
    size="large" 
    text="곧 완료됩니다!" 
  />
</div>

// 파일 크기: JSON 1개 (~15KB) + lottie-react 라이브러리
// 의존성: lottie-react 필요
// 장점: 복잡한 애니메이션, After Effects 연동 가능`}
            </pre>
          </details>
        </section>

        {/* Radius 테스트 */}
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Radius Component</h2>
          <p className="text-gray-600 mb-4">
            원형 진행률을 표시하는 Radius 컴포넌트입니다. 크기와 스타일을
            커스터마이징할 수 있습니다.
          </p>

          <div className="space-y-6">
            {/* 진행률 조절 슬라이더 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">진행률 조절</h3>
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-600">진행률:</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={radiusValue}
                  onChange={(e) => setRadiusValue(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-12">{radiusValue}%</span>
              </div>
            </div>

            {/* 다양한 크기 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">다양한 크기</h3>
              <div className="flex items-center justify-around gap-4">
                <div className="text-center">
                  <Radius progress={radiusValue} size={80} />
                  <p className="text-xs text-gray-500 mt-2">Small (80px)</p>
                </div>
                <div className="text-center">
                  <Radius progress={radiusValue} size={100} />
                  <p className="text-xs text-gray-500 mt-2">Medium (100px)</p>
                </div>
                <div className="text-center">
                  <Radius progress={radiusValue} size={120} />
                  <p className="text-xs text-gray-500 mt-2">Large (120px)</p>
                </div>
              </div>
            </div>

            {/* 다양한 스타일 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">다양한 스타일</h3>
              <div className="flex items-center justify-around gap-4">
                <div className="text-center">
                  <Radius progress={radiusValue} strokeWidth={8} />
                  <p className="text-xs text-gray-500 mt-2">얇은 선 (8px)</p>
                </div>
                <div className="text-center">
                  <Radius progress={radiusValue} strokeWidth={12} />
                  <p className="text-xs text-gray-500 mt-2">중간 선 (12px)</p>
                </div>
                <div className="text-center">
                  <Radius progress={radiusValue} strokeWidth={16} />
                  <p className="text-xs text-gray-500 mt-2">두꺼운 선 (16px)</p>
                </div>
              </div>
            </div>

            {/* 퍼센트 표시 옵션 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">퍼센트 표시 옵션</h3>
              <div className="flex items-center justify-around gap-4">
                <div className="text-center">
                  <Radius progress={radiusValue} showPercentage={true} />
                  <p className="text-xs text-gray-500 mt-2">퍼센트 표시</p>
                </div>
                <div className="text-center">
                  <Radius progress={radiusValue} showPercentage={false} />
                  <p className="text-xs text-gray-500 mt-2">퍼센트 숨김</p>
                </div>
              </div>
            </div>

            {/* 고정된 예시들 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">다양한 진행률 예시</h3>
              <div className="flex items-center justify-around gap-4">
                {[25, 50, 75, 100].map((value) => (
                  <div key={value} className="text-center">
                    <Radius progress={value} size={80} />
                    <p className="text-xs text-gray-500 mt-2">{value}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 사용법 예시 */}
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700">
              사용법 보기
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-x-scroll">
              {`// Radius 사용법
import Radius from '@/components/Radius'

// 기본 사용법
<Radius progress={80} />

// 크기 조절
<Radius 
  progress={80} 
  size={120} 
/>

// 선 두께 조절
<Radius 
  progress={80} 
  strokeWidth={12} 
/>

// 퍼센트 숨기기
<Radius 
  progress={80} 
  showPercentage={false} 
/>

// 모든 옵션 조합
<Radius 
  progress={80}
  size={100}
  strokeWidth={10}
  showPercentage={true}
  className="my-4"
/>`}
            </pre>
          </details>
        </section>

        {/* Picker 테스트 */}
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Picker Component</h2>
          <p className="text-gray-600 mb-4">
            선택형 UI를 제공하는 Picker 컴포넌트입니다. 여러 옵션 중 하나를
            선택할 수 있으며, 선택된 항목은 특별한 테두리와 스타일로 표시됩니다.
            비활성화된 옵션도 지원합니다.
          </p>

          <div className="space-y-8">
            {/* 기본 사용법 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium mb-4">기본 사용법</h3>
              <div className="flex flex-col items-center space-y-4">
                <Picker
                  options={basicOptions}
                  value={basicPickerValue}
                  onChange={setBasicPickerValue}
                />
                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                  <p className="text-sm text-blue-800">
                    <strong>선택된 값:</strong> {basicPickerValue}
                  </p>
                  <p className="text-sm text-blue-700">
                    선택된 옵션:{" "}
                    {
                      basicOptions.find((opt) => opt.value === basicPickerValue)
                        ?.label
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* 다양한 옵션 수 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium mb-4">
                다양한 옵션 수와 내용
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 색상 선택 (5개 옵션) */}
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="text-sm font-medium mb-3">
                    색상 선택 (5개 옵션)
                  </h4>
                  <div className="flex flex-col items-center space-y-3">
                    <Picker
                      options={colorOptions}
                      value={colorPickerValue}
                      onChange={setColorPickerValue}
                    />
                    <p className="text-xs text-gray-600">
                      선택된 색상: <strong>{colorPickerValue}</strong>
                    </p>
                  </div>
                </div>

                {/* 크기 선택 (4개 옵션) */}
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="text-sm font-medium mb-3">
                    크기 선택 (4개 옵션)
                  </h4>
                  <div className="flex flex-col items-center space-y-3">
                    <Picker
                      options={sizeOptions}
                      value={sizePickerValue}
                      onChange={setSizePickerValue}
                    />
                    <p className="text-xs text-gray-600">
                      선택된 크기: <strong>{sizePickerValue}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disabled 옵션 포함 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium mb-4">
                Disabled 옵션 포함 (언어 선택)
              </h3>
              <div className="flex flex-col items-center space-y-4">
                <Picker
                  options={languageOptions}
                  value={languagePickerValue}
                  onChange={setLanguagePickerValue}
                />
                <div className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                  <p className="text-sm text-yellow-800">
                    <strong>선택된 언어:</strong> {languagePickerValue}
                  </p>
                  <p className="text-xs text-yellow-700">
                    중문(Chinese)은 비활성화되어 선택할 수 없습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 긴 텍스트 처리 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium mb-4">
                긴 텍스트 옵션 처리 테스트
              </h3>
              <div className="flex flex-col items-center space-y-4">
                <Picker
                  options={longTextOptions}
                  value="medium"
                  onChange={(value) => console.log("Long text option:", value)}
                />
                <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-400">
                  <p className="text-sm text-purple-800">
                    긴 텍스트가 어떻게 표시되는지 확인할 수 있습니다.
                  </p>
                  <p className="text-xs text-purple-700">
                    텍스트가 컨테이너에 맞게 조정되는지 확인하세요.
                  </p>
                </div>
              </div>
            </div>

            {/* 이모지와 특수 문자 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium mb-4">
                이모지와 특수 문자 (음식 선택)
              </h3>
              <div className="flex flex-col items-center space-y-4">
                <Picker
                  options={dynamicOptions}
                  value={dynamicPickerValue}
                  onChange={setDynamicPickerValue}
                />
                <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                  <p className="text-sm text-green-800">
                    <strong>선택된 음식:</strong> {dynamicPickerValue}
                  </p>
                  <p className="text-xs text-green-700">
                    이모지와 함께 표시되는 옵션들입니다. 샐러드는 비활성화되어
                    있습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 여러 Picker 동시 사용 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium mb-4">
                여러 Picker 동시 사용
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="text-sm font-medium mb-3">색상</h4>
                  <Picker
                    options={colorOptions.slice(0, 3)}
                    value={colorPickerValue}
                    onChange={setColorPickerValue}
                  />
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="text-sm font-medium mb-3">크기</h4>
                  <Picker
                    options={sizeOptions.slice(0, 3)}
                    value={sizePickerValue}
                    onChange={setSizePickerValue}
                  />
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="text-sm font-medium mb-3">음식</h4>
                  <Picker
                    options={dynamicOptions.slice(0, 3)}
                    value={dynamicPickerValue}
                    onChange={setDynamicPickerValue}
                  />
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg border">
                <h4 className="text-sm font-medium mb-2">선택 결과 요약</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">색상:</span>{" "}
                    <strong>{colorPickerValue}</strong>
                  </div>
                  <div>
                    <span className="text-gray-600">크기:</span>{" "}
                    <strong>{sizePickerValue}</strong>
                  </div>
                  <div>
                    <span className="text-gray-600">음식:</span>{" "}
                    <strong>{dynamicPickerValue}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 접근성 및 키보드 네비게이션 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium mb-4">접근성 기능</h3>
              <div className="flex flex-col items-center space-y-4">
                <Picker
                  options={basicOptions.slice(0, 3)}
                  value={basicPickerValue}
                  onChange={setBasicPickerValue}
                />
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">
                    키보드 네비게이션
                  </h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Tab: 옵션 간 이동</li>
                    <li>• Enter/Space: 옵션 선택</li>
                    <li>• 비활성화된 옵션은 포커스되지 않음</li>
                    <li>• 스크린 리더에서 role="listbox" 및 aria 속성 지원</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 사용법 예시 */}
          <details className="mt-6">
            <summary className="cursor-pointer text-sm font-medium text-gray-700">
              사용법 보기
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-x-scroll">
              {`// Picker 사용법
import Picker from '@/components/picker/Picker'
import type { PickerOption } from '@/components/picker/Picker'

// 옵션 정의
const options: PickerOption[] = [
  { label: "첫 번째 옵션", value: "option1" },
  { label: "두 번째 옵션", value: "option2" },
  { label: "비활성화된 옵션", value: "option3", disabled: true },
]

// 상태 관리
const [selectedValue, setSelectedValue] = useState("option1")

// 기본 사용법
<Picker
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
/>

// 커스텀 클래스 적용
<Picker
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  className="my-4"
/>

// 이벤트 처리
<Picker
  options={options}
  value={selectedValue}
  onChange={(value) => {
    setSelectedValue(value)
    console.log('Selected:', value)
  }}
/>

// 복잡한 옵션 예시
const complexOptions: PickerOption[] = [
  { label: "🍕 피자", value: "pizza" },
  { label: "🍔 햄버거", value: "burger" },
  { 
    label: "매우 긴 옵션 텍스트 예시입니다", 
    value: "long-text" 
  },
  { 
    label: "비활성화된 옵션", 
    value: "disabled", 
    disabled: true 
  },
]

// 컴포넌트 특징:
// - 선택된 항목은 SelectedItemBorder로 감싸짐
// - 비활성화된 옵션은 클릭 및 키보드 네비게이션 불가
// - 완전한 접근성 지원 (ARIA, 키보드 네비게이션)
// - 반응형 디자인`}
            </pre>
          </details>
        </section>

        {/* 컴포넌트 상태 요약 */}
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Current State Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
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
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-medium text-orange-900">ProgressBar</h3>
              <p className="text-sm text-orange-700">
                Current: {progressStage}%
              </p>
              <p className="text-sm text-orange-700">Figma SVG based</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-medium text-indigo-900">Radius</h3>
              <p className="text-sm text-indigo-700">Current: {radiusValue}%</p>
              <p className="text-sm text-indigo-700">
                Circular progress indicator
              </p>
            </div>
            <div className="p-4 bg-cyan-50 rounded-lg">
              <h3 className="font-medium text-cyan-900">LottieLoading</h3>
              <p className="text-sm text-cyan-700">JSON Lottie animation</p>
              <p className="text-sm text-cyan-700">Complex vector animation</p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg">
              <h3 className="font-medium text-pink-900">Picker</h3>
              <p className="text-sm text-pink-700">Basic: {basicPickerValue}</p>
              <p className="text-sm text-pink-700">Color: {colorPickerValue}</p>
              <p className="text-sm text-pink-700">
                Food: {dynamicPickerValue}
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Test Section */}
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Interactive Test</h2>
          <p className="text-gray-600 mb-4">
            아래 버튼들을 클릭해서 컴포넌트들의 상태를 변경해보세요.
          </p>

          {/* SectionIndicator 테스트 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">SectionIndicator</h3>
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
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">
                현재 선택된 섹션:{" "}
                <strong>{sectionItems[sectionIndex]?.label}</strong> (인덱스:{" "}
                {sectionIndex})
              </p>
            </div>
          </div>

          {/* Picker 테스트 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Picker</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* 색상 Picker 빠른 변경 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-3">색상 빠른 선택</h4>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setColorPickerValue(option.value)}
                      className={`px-3 py-1 text-xs rounded border transition-colors ${
                        colorPickerValue === option.value
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 크기 Picker 빠른 변경 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-3">크기 빠른 선택</h4>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSizePickerValue(option.value)}
                      className={`px-3 py-1 text-xs rounded border transition-colors ${
                        sizePickerValue === option.value
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 음식 Picker 빠른 변경 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-3">음식 빠른 선택</h4>
                <div className="flex flex-wrap gap-2">
                  {dynamicOptions
                    .filter((option) => !option.disabled)
                    .map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setDynamicPickerValue(option.value)}
                        className={`px-3 py-1 text-xs rounded border transition-colors ${
                          dynamicPickerValue === option.value
                            ? "bg-purple-500 text-white border-purple-500"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-pink-50 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Picker 현재 상태</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-pink-600">색상:</span>{" "}
                  <strong>{colorPickerValue}</strong>
                </div>
                <div>
                  <span className="text-pink-600">크기:</span>{" "}
                  <strong>{sizePickerValue}</strong>
                </div>
                <div>
                  <span className="text-pink-600">음식:</span>{" "}
                  <strong>{dynamicPickerValue}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* ProgressBar & Radius 테스트 */}
          <div>
            <h3 className="text-lg font-medium mb-3">ProgressBar & Radius</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-3">ProgressBar 단계</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {([20, 40, 60, 80, 100] as const).map((stage) => (
                    <button
                      key={stage}
                      onClick={() => setProgressStage(stage)}
                      className={`px-3 py-1 text-xs rounded border transition-colors ${
                        progressStage === stage
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {stage}%
                    </button>
                  ))}
                </div>
                <p className="text-xs text-orange-600">
                  현재: <strong>{progressStage}%</strong>
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-3">Radius 진행률</h4>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={radiusValue}
                  onChange={(e) => setRadiusValue(Number(e.target.value))}
                  className="w-full mb-2"
                />
                <p className="text-xs text-indigo-600">
                  현재: <strong>{radiusValue}%</strong>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
