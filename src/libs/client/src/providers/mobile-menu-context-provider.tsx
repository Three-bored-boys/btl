"use client";

import { createContext } from "react";
import React from "react";

export const MobileMenuContext = createContext<{
  showMobileMenu: boolean;
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const MobileMenuContextProvider = function ({ children }: { children: React.ReactNode }) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const value = React.useMemo(() => ({ showMobileMenu, setShowMobileMenu }), [showMobileMenu]);

  return <MobileMenuContext.Provider value={value}>{children}</MobileMenuContext.Provider>;
};
