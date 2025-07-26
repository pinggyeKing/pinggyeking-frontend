'use client';
import CharacterWithSpeechBubble from '@/components/icons/CharacterWithSpeechBubble';
import { useEffect, useState } from 'react';
import styles from './testpage.module.scss';
import Checkbox from '@/components/inputs/Checkbox';
import Radio from '@/components/inputs/Radio';
import Toggle from '@/components/inputs/Toggle';
import TextBox from '@/components/inputs/TextBox/TextBox';

function Dashboard() {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const [textValue, setTextValue] = useState(
    '안녕하세요! 이것은 TextBox 컴포넌트 예시입니다.',
  );
  const [numberValue, setNumberValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [toggleValue, setToggleValue] = useState(false);

  useEffect(() => {
    // 폰트 로딩 상태 확인
    const checkFontLoading = async () => {
      try {
        await document.fonts.ready;
        const fontFaces = Array.from(document.fonts);
        const ownglyphFont = fontFaces.find(
          (font) => font.family === 'Ownglyph PDH',
        );
        setFontLoaded(!!ownglyphFont && ownglyphFont.status === 'loaded');
        console.log('Font loading status:', {
          ready: true,
          ownglyphFound: !!ownglyphFont,
          status: ownglyphFont?.status,
          allFonts: fontFaces.map((f) => ({
            family: f.family,
            status: f.status,
          })),
        });
      } catch (error) {
        console.error('Font loading check failed:', error);
      }
    };

    checkFontLoading();
  }, []);

  const characters = [
    'default',
    'excited',
    'kidding',
    'sad',
    'cute',
    'cool',
    'crown',
    'suit',
  ] as const;

  const bubblePositions = ['top', 'bottom', 'left', 'right'] as const;

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

  return (
    <div className="p-8 space-y-12">
      <div className="bg-blue-1 p-4 rounded">
        <h1 className="text-2xl font-bold">캐릭터 컴포넌트 테스트</h1>
        <p className="text-sm mt-2">
          폰트 로딩 상태: {fontLoaded ? '✅ 로드됨' : '❌ 로드 안됨'}
        </p>
      </div>

      {/* 폰트 디버깅 테스트 - 상단으로 이동 */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold bg-red-100 p-3 rounded">
          폰트 디버깅 테스트 (상단)
        </h2>
        <div className="bg-grey-1 p-4 rounded space-y-4 border-2 border-red-300">
          <div>
            <p className="text-sm text-grey-6 mb-2">Pretendard (기본 폰트):</p>
            <p
              style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '30px' }}
            >
              에에... 그게...
            </p>
          </div>
          <div>
            <p className="text-sm text-grey-6 mb-2">
              Ownglyph PDH (커스텀 폰트):
            </p>
            <p
              style={{
                fontFamily: '"Ownglyph PDH", "Pretendard", sans-serif',
                fontSize: '30px',
              }}
            >
              에에... 그게...
            </p>
          </div>
          <div>
            <p className="text-sm text-grey-6 mb-2">CSS 변수 사용:</p>
            <p
              style={{
                fontFamily: 'var(--font-ownglyph-pdh)',
                fontSize: '30px',
              }}
            >
              에에... 그게...
            </p>
          </div>
          <div>
            <p className="text-sm text-grey-6 mb-2">CSS 클래스 사용:</p>
            <p className="text-speech-bubble">에에... 그게...</p>
          </div>
        </div>
      </div>

      {/* 모든 캐릭터 테스트 */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">캐릭터 타입별 테스트</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {characters.map((character) => (
            <div key={character} className="text-center space-y-2">
              <CharacterWithSpeechBubble
                character={character}
                speechText={`${character} 캐릭터`}
              />
              <p className="text-sm text-grey-6">{character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 말풍선 위치 테스트 */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">말풍선 위치 테스트</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {bubblePositions.map((position) => (
            <div key={position} className="text-center space-y-2">
              <CharacterWithSpeechBubble
                character="cool"
                speechText={`${position} 위치`}
                bubblePosition={position}
              />
              <p className="text-sm text-grey-6">{position}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 커스텀 스타일 테스트 */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">커스텀 스타일 테스트</h2>
        <div className="flex flex-wrap gap-8 justify-center">
          <div className="text-center space-y-2">
            <CharacterWithSpeechBubble
              character="crown"
              speechText="파란색 말풍선"
              speechBubbleClassName="bg-blue-1 border-blue-3"
              textClassName="text-blue-5 font-bold"
            />
            <p className="text-sm text-grey-6">파란색 테마</p>
          </div>
          <div className="text-center space-y-2">
            <CharacterWithSpeechBubble
              character="suit"
              speechText="노란색 말풍선"
              speechBubbleClassName="bg-yellow-1 border-yellow-3"
              textClassName="text-yellow-5 font-bold"
            />
            <p className="text-sm text-grey-6">노란색 테마</p>
          </div>
        </div>
      </div>

      {/* 텍스트 길이 테스트 */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">텍스트 길이 테스트</h2>
        <div className="flex flex-wrap gap-8 justify-center">
          <div className="text-center space-y-2">
            <CharacterWithSpeechBubble character="excited" speechText="짧음" />
            <p className="text-sm text-grey-6">짧은 텍스트</p>
          </div>
          <div className="text-center space-y-2">
            <CharacterWithSpeechBubble
              character="kidding"
              speechText="에에... 그게..."
            />
            <p className="text-sm text-grey-6">중간 텍스트</p>
          </div>
          <div className="text-center space-y-2">
            <CharacterWithSpeechBubble
              character="sad"
              speechText="긴 텍스트는 어떻게 보일까요?"
            />
            <p className="text-sm text-grey-6">긴 텍스트</p>
          </div>
        </div>
      </div>

      {/* 기본값 테스트 */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">기본값 테스트</h2>
        <div className="text-center space-y-2">
          <CharacterWithSpeechBubble />
          <p className="text-sm text-grey-6">모든 기본값 사용</p>
        </div>
      </div>

      {/* input 컴포넌트 예시 (inputs 폴더 컴포넌트 활용) */}
      <div className="mt-12 p-8 bg-slate-50 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">
          Input 컴포넌트 예시 (Custom Components)
        </h2>
        <div className="flex flex-col gap-6">
          {/* Checkbox 예시 */}
          <div>
            <Checkbox
              checked={checkboxValue}
              onChange={setCheckboxValue}
              label="동의합니다"
              size="medium"
            />
          </div>
          {/* Radio 예시 */}
          <div className="flex flex-col gap-2">
            <span className="text-base font-medium mb-1">성별</span>
            <div className="flex gap-6">
              <Radio
                checked={radioValue === 'male'}
                onChange={() => setRadioValue('male')}
                label="남성"
              />
              <Radio
                checked={radioValue === 'female'}
                onChange={() => setRadioValue('female')}
                label="여성"
              />
            </div>
          </div>
          {/* Toggle 예시 */}
          <div>
            <Toggle
              checked={toggleValue}
              onChange={setToggleValue}
              label="토글 스위치"
            />
          </div>
          {/* TextBox 예시 */}
          <div className="flex flex-col gap-4">
            <TextBox
              value={textValue}
              status="default"
              editable
              onChange={setTextValue}
            />
            <TextBox value={textValue} status="clicked" />
            <TextBox value={textValue} status="inputed" />
            <TextBox
              value={textValue}
              status="error"
              error="에러 메시지 예시"
            />
            <TextBox
              value={textValue}
              status="success"
              success="성공 메시지 예시"
            />
            <TextBox
              value={textValue}
              status="default"
              multiline
              time="오후 2:30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
