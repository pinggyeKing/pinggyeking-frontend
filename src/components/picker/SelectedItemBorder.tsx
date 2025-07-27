import React from "react";

interface SelectedItemBorderProps {
  children: React.ReactNode;
}

const SelectedItemBorder: React.FC<SelectedItemBorderProps> = ({
  children,
}) => {
  return (
    <div className="relative w-full h-12">
      {/* Hand-drawn SVG Border */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 2.5 C50 1, 150 0.5, 250 1.5 C300 2, 350 2.5, 392 3.5 C394 3.8, 396 5, 397.5 7 C398.5 12, 398.2 20, 397.8 30 C397.5 38, 396.8 42, 395 44.5 C393 45.8, 390 46.2, 385 45.8 C340 45.5, 250 45.2, 150 45.5 C100 45.7, 50 45.8, 15 45.5 C10 45.3, 6 44.8, 3.5 43 C2 41, 1.8 38, 2.2 35 C2.5 25, 2.8 15, 3.2 8 C3.8 5, 5.5 3, 8 2.5 Z"
          stroke="#1E1E1E"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Content */}
      <div
        className="relative w-full h-full flex items-center justify-center text-black font-semibold text-[16px] z-10"
        style={{
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SelectedItemBorder;
