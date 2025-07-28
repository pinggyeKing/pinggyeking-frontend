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
        flex flex-col items-center justify-center cursor-pointer transition-all duration-200
      `}
      onClick={() => onClick(id)}
      style={{
        width: "81.23px",
        minHeight: "fit-content",
        borderRadius: "9.85px",
        padding: "8px",
        gap: "4px",
      }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "62.75px",
          height: "64.31px",
        }}
      >
        <Image
          src={getImageSrc()}
          alt={`${name} character`}
          width={62.75}
          height={64.31}
          className="object-contain"
        />
      </div>
      <div className="relative flex items-center justify-center">
        <div
          className="absolute bg-white"
          style={{
            width:
              name === "유머러스" ? "37px" : name === "큐트" ? "21px" : "20px",
            height: "2px",
            top: "4.6px",
          }}
        />
      </div>
    </div>
  );
};

export default CarouselItem;
