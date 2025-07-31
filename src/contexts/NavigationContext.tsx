"use client";

import React, { createContext, useContext, useState } from "react";

interface NavigationContextType {
  showNavigation: boolean;
  setShowNavigation: (show: boolean) => void;
  hideNavigation: () => void;
  showNavigationBar: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showNavigation, setShowNavigation] = useState(true);

  const hideNavigation = () => {
    setShowNavigation(false);
  };

  const showNavigationBar = () => {
    setShowNavigation(true);
  };

  return (
    <NavigationContext.Provider
      value={{
        showNavigation,
        setShowNavigation,
        hideNavigation,
        showNavigationBar,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
