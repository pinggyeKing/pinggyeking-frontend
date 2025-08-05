import React from "react";

export interface FigmaButtonProps {
  // Variant (Type)
  variant?: "primary" | "outline1" | "outline2" | "ghost" | "icon" | "disable";

  // Round (Border Radius)
  round?: "square" | "standard" | "pills";

  // Size (스케일링 배수, 기본값: 1.0)
  size?: number;

  // State
  active?: boolean; // Press & Hold 상태
  disabled?: boolean;

  // Icons
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  hideText?: boolean; // 아이콘 전용 모드

  // Content
  children?: React.ReactNode;

  // Interaction
  onClick?: () => void;
  className?: string;
}

const FigmaButton: React.FC<FigmaButtonProps> = ({
  variant = "primary",
  round = "standard",
  size = 1.0,
  active = false,
  disabled = false,
  leftIcon,
  rightIcon,
  hideText = false,
  children,
  onClick,
  className = "",
}) => {
  // 베이스 크기 (Large 기준)
  const baseStyles = {
    padding: 12 * size + "px " + 16 * size + "px",
    fontSize: 26 * size + "px",
    iconSize: 24 * size + "px",
    gap: 4 * size + "px",
  };

  // SVG 배경 이미지 선택
  const getBackgroundImage = () => {
    switch (round) {
      case "square":
        return "url('/icons/figma-button/button-square.svg')";
      case "standard":
        return "url('/icons/figma-button/button-standard.svg')";
      case "pills":
        return "url('/icons/figma-button/button-pills.svg')";
      default:
        return "url('/icons/figma-button/button-standard.svg')";
    }
  };

  // Variant별 색상 스타일
  const getVariantStyles = () => {
    const baseStyle = {
      backgroundImage: getBackgroundImage(),
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      border: "none",
      outline: "none",
    };

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: active ? "#4E4E4E" : "#1E1E1E",
          color: "#FFFFFF",
          filter: active ? "brightness(0.8)" : "none",
        };

      case "outline1":
        return {
          ...baseStyle,
          backgroundColor: active ? "#1E1E1E" : "#FFFFFF",
          color: active ? "#FFFFFF" : "#1E1E1E",
          border: "1px solid #1E1E1E",
        };

      case "outline2":
        return {
          ...baseStyle,
          backgroundColor: active ? "#1E1E1E" : "#FFFFFF",
          color: active ? "#FFFFFF" : "#1E1E1E",
          border: "2px solid #1E1E1E",
        };

      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: active ? "#1E1E1E" : "transparent",
          color: active ? "#FFFFFF" : "#1E1E1E",
          border: active ? "1.5px solid #1E1E1E" : "none",
        };

      case "disable":
        return {
          ...baseStyle,
          backgroundColor: active ? "#E4E4E4" : "#F0F0F0",
          color: "#B5B5B5",
          border: "1.5px solid #F0F0F0",
          cursor: "not-allowed",
        };

      case "icon":
        return {
          ...baseStyle,
          backgroundColor: active ? "#4E4E4E" : "#1E1E1E",
          color: "#FFFFFF",
          filter: active ? "brightness(0.8)" : "none",
        };

      default:
        return baseStyle;
    }
  };

  const handleClick = () => {
    if (disabled || variant === "disable") {
      return;
    }
    console.log("FigmaButton clicked!");
    onClick?.();
  };

  const buttonStyles = {
    ...getVariantStyles(),
    padding: baseStyles.padding,
    fontSize: baseStyles.fontSize,
    fontFamily: "Ownglyph PDH, Pretendard, sans-serif",
    fontWeight: 400,
    lineHeight: 0.923,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: baseStyles.gap,
    cursor: disabled || variant === "disable" ? "not-allowed" : "pointer",
    transition: "all 0.15s ease",
    opacity: disabled ? 0.5 : 1,
  };

  const iconStyle = {
    width: baseStyles.iconSize,
    height: baseStyles.iconSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <button
      className={`figma-button ${className}`}
      onClick={handleClick}
      disabled={disabled || variant === "disable"}
      style={buttonStyles}
    >
      {leftIcon && <span style={iconStyle}>{leftIcon}</span>}
      {!hideText && children && <span>{children}</span>}
      {rightIcon && <span style={iconStyle}>{rightIcon}</span>}
    </button>
  );
};

export default FigmaButton;
