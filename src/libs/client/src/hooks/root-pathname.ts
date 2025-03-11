"use client";

import React from "react";
import { RootPathnameContext } from "@/client/providers";

export const useRootPathnameContext = function () {
  const context = React.useContext(RootPathnameContext);

  if (!context) {
    throw new Error("useRootPathnameContext must be used within a RootPathnameContextProvider");
  }

  return context;
};
