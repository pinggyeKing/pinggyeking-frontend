import React, { useState, useRef, useEffect, useCallback } from "react";
import CarouselItem from "./CarouselItem";

interface CarouselProps {
  onSelectionChange?: (selectedId: string) => void;
  initialSelected?: string;
}

const carouselItems = [
  { id: "default", name: "기본" },
  { id: "formal", name: "정중" },
  { id: "cute", name: "큐트" },
  { id: "humorous", name: "유머러스" },
  { id: "pop", name: "팝" },
];

const Carousel: React.FC<CarouselProps> = ({
  onSelectionChange,
  initialSelected = "default",
}) => {
  const [selectedId, setSelectedId] = useState(initialSelected);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleItemClick = useCallback(
    (id: string) => {
      if (!isDragging) {
        setSelectedId(id);
        onSelectionChange?.(id);
      }
    },
    [isDragging, onSelectionChange],
  );

  const getCurrentIndex = useCallback(() => {
    return carouselItems.findIndex((item) => item.id === selectedId);
  }, [selectedId]);

  const selectNext = useCallback(() => {
    const currentIndex = getCurrentIndex();
    const nextIndex = (currentIndex + 1) % carouselItems.length;
    const nextId = carouselItems[nextIndex].id;
    setSelectedId(nextId);
    onSelectionChange?.(nextId);
  }, [getCurrentIndex, onSelectionChange]);

  const selectPrevious = useCallback(() => {
    const currentIndex = getCurrentIndex();
    const prevIndex =
      currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1;
    const prevId = carouselItems[prevIndex].id;
    setSelectedId(prevId);
    onSelectionChange?.(prevId);
  }, [getCurrentIndex, onSelectionChange]);

  // 통합된 포인터 이벤트 처리
  const getClientX = (e: React.TouchEvent | React.MouseEvent): number => {
    return "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  const handlePointerStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = getClientX(e);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handlePointerMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (isDragging) {
        const clientX = getClientX(e);
        setCurrentX(clientX);
      }
    },
    [isDragging],
  );

  const handlePointerEnd = useCallback(() => {
    if (isDragging) {
      const deltaX = currentX - startX;
      const threshold = 50; // 수평 스와이프 감지 임계값

      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          // 오른쪽으로 스와이프 - 이전 아이템
          selectPrevious();
        } else {
          // 왼쪽으로 스와이프 - 다음 아이템
          selectNext();
        }
      }

      setIsDragging(false);
    }
  }, [isDragging, currentX, startX, selectNext, selectPrevious]);

  // 키보드 네비게이션
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        selectPrevious();
        break;
      case "ArrowRight":
        e.preventDefault();
        selectNext();
        break;
      case "Home":
        e.preventDefault();
        const firstId = carouselItems[0].id;
        setSelectedId(firstId);
        onSelectionChange?.(firstId);
        break;
      case "End":
        e.preventDefault();
        const lastId = carouselItems[carouselItems.length - 1].id;
        setSelectedId(lastId);
        onSelectionChange?.(lastId);
        break;
    }
  };

  // 전역 포인터 이벤트 리스너 (드래그 중에만)
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      setCurrentX(clientX);
    };

    const handleGlobalPointerEnd = () => {
      setIsDragging(false);
    };

    // 마우스 이벤트
    document.addEventListener("mousemove", handleGlobalPointerMove);
    document.addEventListener("mouseup", handleGlobalPointerEnd);

    // 터치 이벤트
    document.addEventListener(
      "touchmove",
      handleGlobalPointerMove as EventListener,
    );
    document.addEventListener("touchend", handleGlobalPointerEnd);

    return () => {
      document.removeEventListener("mousemove", handleGlobalPointerMove);
      document.removeEventListener("mouseup", handleGlobalPointerEnd);
      document.removeEventListener(
        "touchmove",
        handleGlobalPointerMove as EventListener,
      );
      document.removeEventListener("touchend", handleGlobalPointerEnd);
    };
  }, [isDragging]);

  // 초기 스크롤 위치 설정
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, []);

  return (
    <div
      ref={carouselRef}
      className="w-full cursor-grab active:cursor-grabbing overflow-x-auto focus:outline-none rounded-lg"
      onTouchStart={handlePointerStart}
      onMouseDown={handlePointerStart}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="listbox"
      aria-label="캐릭터 스타일 선택"
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      <div className="flex gap-2 py-2" style={{ minWidth: "max-content" }}>
        {carouselItems.map((item) => (
          <CarouselItem
            key={item.id}
            id={item.id}
            name={item.name}
            isSelected={selectedId === item.id}
            onClick={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
