"use client";

import React, { useRef, useState } from "react";
import CanvasCard from "../../card-image/components/CanvasCard";
import { Carousel } from "../components";
import FigmaButton from "@/components/FigmaButton";
import { downloadCanvasCardAsJPG } from "../utils/canvasUtils";
import { copyCurrentUrl, shareToKakao } from "../utils";
import { ToastContainer, useToast } from "@/components/common/Toast";

export default function CanvasDemoPage() {
  const [selectedCardType, setSelectedCardType] = useState<
    "default" | "formal" | "cute" | "humorous" | "pop"
  >("default");
  const [cardScale, setCardScale] = useState<number>(0.65);
  const canvasCardRef = useRef<any>(null);
  const { showSuccessToast } = useToast();

  // 텍스트 위치 상태
  const [textPositions, setTextPositions] = useState({
    recipient: { x: 0.09, y: 0.15 },
    message: { x: 0.09, y: 0.25, maxWidth: 0.82, maxHeight: 0.6 },
  });

  // 폰트 크기 상태
  const [fontSizes, setFontSizes] = useState({
    recipient: 0.063,
    message: 0.032,
  });

  const handleSelectionChange = (selectedId: string) => {
    console.log("Selected character style:", selectedId);
    setSelectedCardType(
      selectedId as "default" | "formal" | "cute" | "humorous" | "pop",
    );
  };

  const handleBackClick = () => {
    console.log("Back button clicked");
  };

  const handleDownload = async () => {
    if (canvasCardRef.current) {
      const success = await downloadCanvasCardAsJPG(
        canvasCardRef.current,
        "부장님",
        selectedCardType,
      );
      if (success) {
        showSuccessToast("Canvas 이미지가 저장되었어요!");
      }
    }
  };

  const updateRecipientPosition = (key: "x" | "y", value: number) => {
    setTextPositions((prev) => ({
      ...prev,
      recipient: { ...prev.recipient, [key]: value },
    }));
  };

  const updateMessagePosition = (
    key: "x" | "y" | "maxWidth" | "maxHeight",
    value: number,
  ) => {
    setTextPositions((prev) => ({
      ...prev,
      message: { ...prev.message, [key]: value },
    }));
  };

  const updateFontSize = (type: "recipient" | "message", value: number) => {
    setFontSizes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center min-h-full w-full">
        {/* Header Section */}
        <div className="flex flex-col gap-4 mb-5 w-full">
          {/* Back Button */}
          <div className="flex justify-end">
            <FigmaButton
              variant="primary"
              round="pills"
              size={1.0}
              active={false}
              disabled={false}
              onClick={handleBackClick}
            >
              이전으로
            </FigmaButton>
          </div>
          {/* Title Area */}
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-section-title text-grey-10 uppercase">
              Canvas 카드 데모 + 텍스트 위치 조정
            </h1>
            <p className="text-sm text-grey-7">
              실시간으로 텍스트 위치와 크기를 조정해보세요
            </p>
          </div>
        </div>

        {/* Card Style Selection */}
        <Carousel
          onSelectionChange={handleSelectionChange}
          initialSelected={selectedCardType}
        />

        {/* Canvas Card Preview */}
        <div className="mb-5 flex justify-center w-full">
          <div className="inline-block">
            <CanvasCard
              ref={canvasCardRef}
              recipient="부장님"
              message={`부장님, 정말 죄송합니다만....내일 회식에 참석하지 못할 것 같습니다... 


이유,,,, 

,,,,`}
              cardType={selectedCardType}
              scale={cardScale}
              textPositions={textPositions}
              fontSizes={fontSizes}
            />
          </div>
        </div>

        {/* Controls Section */}
        <div className="w-full max-w-2xl space-y-6 mb-6">
          {/* Scale Control */}
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-medium text-grey-10 mb-3">카드 크기</h3>
            <label className="block text-sm text-grey-8 mb-2">
              크기: {(cardScale * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.3"
              max="1.5"
              step="0.05"
              value={cardScale}
              onChange={(e) => setCardScale(parseFloat(e.target.value))}
              className="w-full h-2 bg-grey-3 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Recipient Text Controls */}
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-medium text-grey-10 mb-3">
              수신자 텍스트 ("To. 부장님")
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-grey-8 mb-1">
                  X 위치: {(textPositions.recipient.x * 100).toFixed(1)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.01"
                  value={textPositions.recipient.x}
                  onChange={(e) =>
                    updateRecipientPosition("x", parseFloat(e.target.value))
                  }
                  className="w-full h-2 bg-grey-3 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm text-grey-8 mb-1">
                  Y 위치: {(textPositions.recipient.y * 100).toFixed(1)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.01"
                  value={textPositions.recipient.y}
                  onChange={(e) =>
                    updateRecipientPosition("y", parseFloat(e.target.value))
                  }
                  className="w-full h-2 bg-grey-3 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-grey-8 mb-1">
                  폰트 크기: {(fontSizes.recipient * 100).toFixed(1)}%
                </label>
                <input
                  type="range"
                  min="0.02"
                  max="0.12"
                  step="0.005"
                  value={fontSizes.recipient}
                  onChange={(e) =>
                    updateFontSize("recipient", parseFloat(e.target.value))
                  }
                  className="w-full h-2 bg-grey-3 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Message Text Controls */}
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-medium text-grey-10 mb-3">메시지 텍스트</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-grey-8 mb-1">
                  X 위치: {(textPositions.message.x * 100).toFixed(1)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.01"
                  value={textPositions.message.x}
                  onChange={(e) =>
                    updateMessagePosition("x", parseFloat(e.target.value))
                  }
                  className="w-full h-2 bg-grey-3 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm text-grey-8 mb-1">
                  Y 위치: {(textPositions.message.y * 100).toFixed(1)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.01"
                  value={textPositions.message.y}
                  onChange={(e) =>
                    updateMessagePosition("y", parseFloat(e.target.value))
                  }
                  className="w-full h-2 bg-grey-3 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm text-grey-8 mb-1">
                  최대 폭: {(textPositions.message.maxWidth * 100).toFixed(1)}%
                </label>
                <input
                  type="range"
                  min="0.3"
                  max="1"
                  step="0.01"
                  value={textPositions.message.maxWidth}
                  onChange={(e) =>
                    updateMessagePosition(
                      "maxWidth",
                      parseFloat(e.target.value),
                    )
                  }
                  className="w-full h-2 bg-grey-3 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm text-grey-8 mb-1">
                  최대 높이:{" "}
                  {(textPositions.message.maxHeight * 100).toFixed(1)}%
                </label>
                <input
                  type="range"
                  min="0.3"
                  max="0.8"
                  step="0.01"
                  value={textPositions.message.maxHeight}
                  onChange={(e) =>
                    updateMessagePosition(
                      "maxHeight",
                      parseFloat(e.target.value),
                    )
                  }
                  className="w-full h-2 bg-grey-3 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-grey-8 mb-1">
                  폰트 크기: {(fontSizes.message * 100).toFixed(1)}%
                </label>
                <input
                  type="range"
                  min="0.015"
                  max="0.08"
                  step="0.005"
                  value={fontSizes.message}
                  onChange={(e) =>
                    updateFontSize("message", parseFloat(e.target.value))
                  }
                  className="w-full h-2 bg-grey-3 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Current Values Display */}
          <div className="bg-grey-1 p-4 rounded-lg">
            <h3 className="font-medium text-grey-10 mb-2">
              현재 설정값 (복사해서 사용)
            </h3>
            <div className="text-sm text-grey-8 font-mono">
              <div className="mb-2">
                <strong>textPositions:</strong>
              </div>
              <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
                {JSON.stringify(textPositions, null, 2)}
              </pre>
              <div className="mt-2 mb-2">
                <strong>fontSizes:</strong>
              </div>
              <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
                {JSON.stringify(fontSizes, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 px-1 w-full max-w-md">
          <button
            className="flex-1 border-2 border-grey-10 rounded-[24px] py-3 flex justify-center items-center bg-white hover:bg-grey-1 transition-colors"
            onClick={() => {
              shareToKakao({
                title: "Canvas 카드 데모",
                description: "Canvas로 생성된 핑계 카드를 확인해주세요",
                imageUrl: "/cards/kakao-share-image.png",
                linkUrl: window.location.href,
              });
            }}
          >
            <img
              src="/icons/kakao-talk-share.svg"
              alt="KakaoTalk"
              className="w-6 h-6"
            />
          </button>
          <button
            className="flex-1 border-2 border-grey-10 rounded-[24px] py-3 flex justify-center items-center bg-white hover:bg-grey-1 transition-colors"
            onClick={async () => {
              const success = await copyCurrentUrl("", "");
              if (success) {
                showSuccessToast("링크가 복사되었어요!");
              }
            }}
          >
            <img src="/icons/li-link.svg" alt="Link" className="w-6 h-6" />
          </button>
          <button
            className="flex-1 bg-grey-10 border-[1.5px] border-grey-10 text-white rounded-[24px] py-3 flex justify-center items-center hover:bg-grey-9 transition-colors"
            onClick={handleDownload}
          >
            <img
              src="/icons/li-download.svg"
              alt="Download"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </>
  );
}
