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
  pressHold?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export default function CustomButton({
  typeStyle = "primary",
  size = "large",
  round = "standard",
  pressHold = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}: CustomButtonProps) {
  // type + pressHold에 따른 색상/테두리
  const typeClass = (() => {
    if (typeStyle === "primary") {
      return pressHold
        ? "bg-grey-8 text-grey-0 border-grey-8"
        : "bg-grey-10 text-grey-10 border-grey-10";
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
    if (round === "square") return "radius-4";
    if (round === "standard") {
      if (size === "large") return "radius-20";
      if (size === "medium") return "radius-16";
      if (size === "small") return "radius-12";
      if (size === "xsmall") return "radius-8";
    }
    if (round === "pills") {
      if (size === "large") return "radius-24";
      if (size === "medium") return "radius-16";
      if (size === "small") return "radius-12";
      if (size === "xsmall") return "radius-8";
    }
    return "";
  })();

  return (
    <button
      className={clsx(
        "flex items-center justify-center font-ownglyph-pdh transition-all",
        typeClass,
        sizeClass,
        roundClass
      )}
      disabled={typeStyle === "disable"}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
