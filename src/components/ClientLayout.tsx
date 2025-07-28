"use client";

import React from "react";
import { useSplash } from "@/contexts/SplashContext";
import SplashPage from "../app/splash/page";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const { showSplash } = useSplash();

  if (showSplash) {
    return <SplashPage />;
  }

  return <>{children}</>;
};

export default ClientLayout;
