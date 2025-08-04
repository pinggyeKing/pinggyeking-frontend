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
      <div
        // className="relative place-items-center"
        className="w-fit"
        style={
          {
            // width: "62.75px",
            // height: "64.31px",
          }
        }
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
      {/* <div className="relative place-items-center">
        <div
          className="absolute bg-white"
          style={{
            width:
              name === "유머러스" ? "37px" : name === "큐트" ? "21px" : "20px",
            height: "2px",
            top: "4.6px",
          }}
        />
      </div> */}
    </div>
  );
};

export default CarouselItem;
