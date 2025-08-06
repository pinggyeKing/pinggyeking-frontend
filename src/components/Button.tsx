import React from "react";

export interface ButtonProps {
  variant: "filled" | "outlined";
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  className = "",
}) => {
  const handleClick = () => {
    console.log("Button clicked!");
    onClick?.();
  };

  const getBackgroundImage = () => {
    if (variant === "filled") {
      return "url('/icons/button-filled.svg')";
    } else {
      return "url('/icons/button-outlined.svg')";
    }
  };

  return (
    <div className="p-2 ">
      <button
        className={`flex items-center justify-center cursor-pointer transition-all duration-150 font-ownglyph-pdh ${className}`}
        onClick={handleClick}
        style={{
          padding: "12px 16px",
          // borderRadius: "24px",
          backgroundImage: getBackgroundImage(),
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          fontFamily: "Ownglyph PDH, Pretendard, sans-serif",
          textAlign: "center",
          color: variant === "filled" ? "#FFFFFF" : "#1E1E1E",
          border: "none",
          outline: "none",
          // minHeight: "48px",
        }}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
