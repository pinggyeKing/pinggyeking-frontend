"use client";

import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../public/animations/loading.json";

interface LottieLoadingProps {
  size?: "small" | "medium" | "large";
  text?: string;
  className?: string;
}

export default function LottieLoading({
  size = "medium",
  text,
  className = "",
}: LottieLoadingProps) {
  const sizeClasses = {
    small: "w-12 h-12",
    medium: "w-16 h-16",
    large: "w-120 h-120",
  };

  const textSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      {text && (
        <p className={`text-gray-600 text-center ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
}
