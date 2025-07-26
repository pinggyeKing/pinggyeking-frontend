import React from "react";

interface SelectedItemBorderProps {
  children: React.ReactNode;
}

const SelectedItemBorder: React.FC<SelectedItemBorderProps> = ({
  children,
}) => {
  return (
    <div
      className="relative w-[400px] h-12 bg-no-repeat bg-center bg-contain"
      style={{
        backgroundImage: "url('/icons/picker.svg')",
        backgroundSize: "100% 100%",
      }}
    >
      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-black font-semibold text-[16px]">
        {children}
      </div>
    </div>
  );
};

export default SelectedItemBorder;
