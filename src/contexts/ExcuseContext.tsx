"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// 데이터 타입 정의
export interface ExcuseFormData {
  target: string;
  tone: string;
  situation: string;
  additionalInfo?: string;
  considerations?: string;
}

export interface ExcuseResult {
  excuse: {
    content: string;
    tip?: string;
  };
  imageKey?: string;
  id?: number;
}

interface ExcuseContextType {
  formData: ExcuseFormData | null;
  result: ExcuseResult | null;
  isRegeneration: boolean;
  regenerationOption: string;
  setFormData: (data: ExcuseFormData) => void;
  setResult: (result: ExcuseResult) => void;
  setRegeneration: (isRegen: boolean, option?: string) => void;
  clearAll: () => void;
  clearResult: () => void;
}

const ExcuseContext = createContext<ExcuseContextType | undefined>(undefined);

export const ExcuseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormDataState] = useState<ExcuseFormData | null>(null);
  const [result, setResultState] = useState<ExcuseResult | null>(null);
  const [isRegeneration, setIsRegenerationState] = useState(false);
  const [regenerationOption, setRegenerationOptionState] = useState("");

  const setFormData = (data: ExcuseFormData) => {
    console.log("[Context] 폼 데이터 저장:", data);
    setFormDataState(data);
  };

  const setResult = (newResult: ExcuseResult) => {
    console.log("[Context] 결과 데이터 저장:", newResult);
    setResultState(newResult);
  };

  const setRegeneration = (isRegen: boolean, option = "") => {
    console.log("[Context] 재생성 설정:", { isRegen, option });
    setIsRegenerationState(isRegen);
    setRegenerationOptionState(option);
  };

  const clearAll = () => {
    console.log("[Context] 모든 데이터 초기화");
    setFormDataState(null);
    setResultState(null);
    setIsRegenerationState(false);
    setRegenerationOptionState("");
  };

  const clearResult = () => {
    console.log("[Context] 결과 데이터만 초기화");
    setResultState(null);
    setIsRegenerationState(false);
    setRegenerationOptionState("");
  };

  return (
    <ExcuseContext.Provider
      value={{
        formData,
        result,
        isRegeneration,
        regenerationOption,
        setFormData,
        setResult,
        setRegeneration,
        clearAll,
        clearResult,
      }}
    >
      {children}
    </ExcuseContext.Provider>
  );
};

export const useExcuseContext = (): ExcuseContextType => {
  const context = useContext(ExcuseContext);
  if (context === undefined) {
    throw new Error("useExcuseContext must be used within an ExcuseProvider");
  }
  return context;
};
