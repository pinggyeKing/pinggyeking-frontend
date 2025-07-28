import React, { useState } from "react";
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

  const handleItemClick = (id: string) => {
    setSelectedId(id);
    onSelectionChange?.(id);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 justify-center max-w-[360px]">
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
