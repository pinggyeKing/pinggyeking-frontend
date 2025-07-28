import React, { useState, useRef, useEffect } from "react";
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

  // 디버그용 로그
  console.log("Carousel rendered with:", {
    initialSelected,
    selectedId,
    carouselItems,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (id: string) => {
    if (!isDragging) {
      setSelectedId(id);
      onSelectionChange?.(id);
    }
  };

  const getCurrentIndex = () => {
    return carouselItems.findIndex((item) => item.id === selectedId);
  };

  const selectNext = () => {
    const currentIndex = getCurrentIndex();
    const nextIndex = (currentIndex + 1) % carouselItems.length;
    const nextId = carouselItems[nextIndex].id;
    setSelectedId(nextId);
    onSelectionChange?.(nextId);
  };

  const selectPrevious = () => {
    const currentIndex = getCurrentIndex();
    const prevIndex =
      currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1;
    const prevId = carouselItems[prevIndex].id;
    setSelectedId(prevId);
    onSelectionChange?.(prevId);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      setCurrentY(e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      const deltaY = startY - currentY;
      const threshold = 30; // 스와이프 감지 임계값

      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
          // 위로 스와이프 - 다음 아이템
          selectNext();
        } else {
          // 아래로 스와이프 - 이전 아이템
          selectPrevious();
        }
      }

      setIsDragging(false);
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setCurrentY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setCurrentY(e.clientY);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      const deltaY = startY - currentY;
      const threshold = 30;

      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
          selectNext();
        } else {
          selectPrevious();
        }
      }

      setIsDragging(false);
    }
  };

  // Global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  // 초기 스크롤 위치 설정 (기본 아이템이 보이도록)
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, []);

  return (
    <div
      ref={carouselRef}
      className="w-full cursor-grab active:cursor-grabbing overflow-x-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ userSelect: "none" }}
    >
      <div className="flex gap-2 justify-center flex-shrink-0 min-w-max">
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
