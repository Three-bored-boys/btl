"use client";

import React from "react";
import { MobileMenuContext } from "@/client/providers";

export const useMobileMenuContext = function () {
  const context = React.useContext(MobileMenuContext);

  if (!context) {
    throw new Error("useMobileMenuContext must be used within a MobileMenuContextProvider");
  }

  return context;
};
