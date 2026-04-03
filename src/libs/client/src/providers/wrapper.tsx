import { ReactNode } from "react";
import { MobileMenuContextProvider } from "./mobile-menu-context-provider";
import { RadixProvider } from "./radix-provider";
import { RootPathnameContextProvider } from "./root-pathname-context-provider";

export const Wrapper = function ({ children }: { children: ReactNode }) {
  return (
    <RadixProvider>
      <RootPathnameContextProvider>
        <MobileMenuContextProvider>{children}</MobileMenuContextProvider>
      </RootPathnameContextProvider>
    </RadixProvider>
  );
};
