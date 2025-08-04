import React from "react";
import Image from "next/image";

interface CarouselItemProps {
  id: string;
  name: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const CarouselItem: React.FC<CarouselItemProps> = ({
  id,
  name,
  isSelected,
  onClick,
}) => {
  const getImageSrc = () => {
    const basePath = "/carousel";
    const selectedSuffix = isSelected ? "-selected" : "-unselected";
    return `${basePath}/${id}${selectedSuffix}.svg`;
  };

  return (
    <div
      onClick={() => onClick(id)}
      role="option"
      aria-selected={isSelected}
      aria-label={`${name} 스타일`}
      tabIndex={-1}
    >
      <Image
        src={getImageSrc()}
        alt={`${name} character`}
        width={82}
        height={86}
        className="object-contain"
        onError={(e) => {
          console.error(`Failed to load image for ${id}:`, e);
        }}
      />
    </div>
  );
};

export default CarouselItem;
