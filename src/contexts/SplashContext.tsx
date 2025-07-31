"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SplashContextType {
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
}

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export const SplashProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // 세션에서 방문 기록 확인
    const hasVisited = sessionStorage.getItem("hasVisited");
    
    if (hasVisited) {
      setShowSplash(false);
    } else {
      // 5.5초 후 스플래시 숨기기
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("hasVisited", "true");
      }, 5500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <SplashContext.Provider value={{ showSplash, setShowSplash }}>
      {children}
    </SplashContext.Provider>
  );
};

export const useSplash = () => {
  const context = useContext(SplashContext);
  if (context === undefined) {
    throw new Error("useSplash must be used within a SplashProvider");
  }
  return context;
};
