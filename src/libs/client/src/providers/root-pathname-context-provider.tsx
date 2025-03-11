"use client";

import { usePathname } from "next/navigation";
import { createContext } from "react";
import React from "react";
import { getRootPathname } from "@/client/utils";

export const RootPathnameContext = createContext<{
  rootPathname: string;
  setRootPathname: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export const RootPathnameContextProvider = function ({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [rootPathname, setRootPathname] = React.useState<string>(getRootPathname(pathname));
  const value = React.useMemo(() => ({ rootPathname, setRootPathname }), [rootPathname]);

  React.useEffect(() => {
    setRootPathname(getRootPathname(pathname));
  }, [pathname]);

  return <RootPathnameContext.Provider value={value}>{children}</RootPathnameContext.Provider>;
};
