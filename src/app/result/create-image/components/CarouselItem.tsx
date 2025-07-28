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
      className={`
        flex flex-col items-center justify-center gap-1 p-2 rounded-lg cursor-pointer transition-all duration-200
        ${
          isSelected
            ? "border border-gray-600 bg-white"
            : "border border-gray-300 bg-white hover:border-gray-400"
        }
      `}
      onClick={() => onClick(id)}
      style={{ width: "81.23px", minHeight: "fit-content" }}
    >
      <div className="relative w-[62.75px] h-[64.31px] flex items-center justify-center">
        <Image
          src={getImageSrc()}
          alt={`${name} character`}
          width={62.75}
          height={64.31}
          className="object-contain"
        />
      </div>
      <div className="relative">
        <div
          className="absolute inset-0 bg-white"
          style={{ width: "20px", height: "2px", top: "4.6px" }}
        />
        <span
          className="relative text-xs font-normal text-gray-800"
          style={{ fontFamily: "Ownglyph PDH" }}
        >
          {name}
        </span>
      </div>
    </div>
  );
};

export default CarouselItem;
