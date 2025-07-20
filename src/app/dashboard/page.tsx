"use client";
import CharacterWithSpeechBubble from "@/components/icons/CharacterWithSpeechBubble";
import { useEffect, useState } from "react";

function Dashboard() {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  useEffect(() => {
    // 폰트 로딩 상태 확인
    const checkFontLoading = async () => {
      try {
        await document.fonts.ready;
        const fontFaces = Array.from(document.fonts);
        const ownglyphFont = fontFaces.find(
          (font) => font.family === "Ownglyph PDH"
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

  return (
    <div className="p-8 space-y-12">
      <div className="bg-blue-1 p-4 rounded">
        <h1 className="text-2xl font-bold">캐릭터 컴포넌트 테스트</h1>
        <p className="text-sm mt-2">
          폰트 로딩 상태: {fontLoaded ? "✅ 로드됨" : "❌ 로드 안됨"}
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
              style={{ fontFamily: "Pretendard, sans-serif", fontSize: "30px" }}
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
                fontSize: "30px",
              }}
            >
              에에... 그게...
            </p>
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
    </div>
  );
}

export default Dashboard;
