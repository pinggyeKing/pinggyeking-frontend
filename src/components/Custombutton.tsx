// src/components/CustomButton.tsx
import React from "react";
import clsx from "clsx";

type ButtonType = "primary" | "outline1" | "outline2" | "ghost" | "disable";
type ButtonSize = "large" | "medium" | "small" | "xsmall";
type ButtonRound = "square" | "standard" | "pills";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  typeStyle?: ButtonType;
  size?: ButtonSize;
  round?: ButtonRound;
  customRadius?: string; // 직접 radius 클래스를 지정할 수 있는 prop 추가
  pressHold?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export default function CustomButton({
  typeStyle = "primary",
  size = "large",
  round = "standard",
  customRadius,
  pressHold = false,
  leftIcon,
  rightIcon,
  children,
  className,
  ...props
}: CustomButtonProps) {
  // type + pressHold에 따른 색상/테두리
  const typeClass = (() => {
    if (typeStyle === "primary") {
      return pressHold
        ? "bg-grey-8 text-grey-0 border-grey-8"
        : "bg-grey-10 text-grey-0 border-grey-10";
    }
    if (typeStyle === "outline1") {
      return pressHold
        ? "bg-grey-10 text-grey-0 border border-grey-10"
        : "bg-grey-0 text-grey-10 border border-grey-10";
    }
    if (typeStyle === "outline2") {
      return pressHold
        ? "bg-grey-10 text-grey-0 border-2 border-grey-10"
        : "bg-grey-0 text-grey-10 border-2 border-grey-10";
    }
    if (typeStyle === "ghost") {
      return pressHold
        ? "bg-grey-10 text-grey-0 border-none"
        : "bg-grey-0 text-grey-10 border-none";
    }
    if (typeStyle === "disable") {
      return pressHold
        ? "bg-grey-3 text-grey-5 border-grey-3"
        : "bg-grey-2 text-grey-5 border-grey-2";
    }
    return "";
  })();

  // size + round에 따른 radius/padding/font
  const sizeClass = (() => {
    if (size === "large") return "button-large";
    if (size === "medium") return "button-medium";
    if (size === "small") return "button-small";
    if (size === "xsmall") return "button-xsmall";
    return "";
  })();

  const roundClass = (() => {
    // customRadius가 제공된 경우 우선적으로 사용
    if (customRadius) return customRadius;

    if (round === "square") return "radius-4";
    if (round === "standard") {
      if (size === "large") return "radius-20";
      if (size === "medium") return "radius-16";
      if (size === "small") return "radius-12";
      if (size === "xsmall") return "radius-8";
      return "radius-20"; // default for standard
    }
    if (round === "pills") {
      if (size === "large") return "radius-24";
      if (size === "medium") return "radius-16";
      if (size === "small") return "radius-12";
      if (size === "xsmall") return "radius-8";
      return "radius-24"; // default for pills
    }
    return "radius-4"; // fallback
  })();

  // children이 실제로 존재하는지 확인하는 헬퍼 함수
  const hasValidChildren = () => {
    if (!children) return false;
    if (typeof children === "string") {
      return children.trim() !== "";
    }
    return true;
  };

  return (
    <button
      className={clsx(
        "flex items-center justify-center font-ownglyph-pdh transition-all w-full",
        typeClass,
        sizeClass,
        roundClass // roundClass를 마지막에 배치해서 우선순위 확보
      )}
      disabled={typeStyle === "disable"}
      {...props}
    >
      {leftIcon && (
        <span className={hasValidChildren() ? "mr-2" : ""}>{leftIcon}</span>
      )}
      {children &&
        typeof children === "string" &&
        children.trim() !== "" &&
        children}
      {children && typeof children !== "string" && children}
      {rightIcon && (
        <span className={hasValidChildren() ? "ml-2" : ""}>{rightIcon}</span>
      )}
    </button>
  );
}
