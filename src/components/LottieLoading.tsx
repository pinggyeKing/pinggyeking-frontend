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
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className={`flex flex-col items-center justify-center`}>
        {text && (
          <p className={`text-section-title text-gray-10 text-center`}>
            {text}
          </p>
        )}
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
