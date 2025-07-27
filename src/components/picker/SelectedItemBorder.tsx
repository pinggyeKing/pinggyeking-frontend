import React from "react";

interface SelectedItemBorderProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

const SelectedItemBorder: React.FC<SelectedItemBorderProps> = ({
  children,
  width = 400,
  height = 48,
}) => {
  return (
    <div className="relative">
      {/* SVG Background with proper scaling */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 436 80"
        className="absolute inset-0"
        preserveAspectRatio="none"
      >
        <image
          href="/icons/picker.svg"
          width="436"
          height="80"
          preserveAspectRatio="none"
        />
      </svg>

      {/* Content overlay */}
      <div
        className="relative flex items-center justify-center text-black font-semibold text-[16px] z-10"
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SelectedItemBorder;
