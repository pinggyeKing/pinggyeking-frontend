"use client";

import React from "react";
import { useSplash } from "@/contexts/SplashContext";
import { useNavigation } from "@/contexts/NavigationContext";
import SplashPage from "../app/splash/page";
import Navigation from "@/components/layout/Navigation";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const { showSplash } = useSplash();
  const { showNavigation } = useNavigation();

  if (showSplash) {
    return <SplashPage />;
  }

  return (
    <>
      {children}
      {showNavigation && <Navigation />}
    </>
  );
};

export default ClientLayout;
