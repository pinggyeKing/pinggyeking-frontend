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
    const imageSrc = `${basePath}/${id}${selectedSuffix}.svg`;
    console.log(`Image src for ${id}: ${imageSrc}, isSelected: ${isSelected}`);
    return imageSrc;
  };

  return (
    <div
      className={`
        grid grid-cols-1 place-items-center cursor-pointer transition-all duration-200 flex-shrink-0
      `}
      onClick={() => onClick(id)}
      style={{
        width: "81.23px",
        minWidth: "81.23px",
        minHeight: "fit-content",
        borderRadius: "9.85px",
        padding: "8px",
        gap: "4px",
      }}
    >
      <div
        className="relative grid place-items-center"
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
          onError={(e) => {
            console.error(`Failed to load image for ${id}:`, e);
          }}
        />
      </div>
      <div className="relative grid place-items-center">
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
