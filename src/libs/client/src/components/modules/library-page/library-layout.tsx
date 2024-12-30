"use client";

import { Container } from "@/root/src/libs/client/src/components/layouts/container";
import { ReactElement } from "react";
import { CaretRight } from "@/root/src/libs/client/src/components/ui/icons/caret-right";
import { CaretLeft } from "@/root/src/libs/client/src/components/ui/icons/caret-left";
import React from "react";
import { cn } from "@/root/src/libs/client/src/utils";
import { Sidebar } from "@/client/components/modules/library-page/sidebar";
import { ToggleSidebar } from "@/client/components/ui/toggle-sidebar";

export const SidebarContext = React.createContext<{
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export function LibraryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  const [showSidebar, setShowSidebar] = React.useState(true);
  const sidebarContextValue = React.useMemo(() => ({ showSidebar, setShowSidebar }), [showSidebar]);

  return (
    <div className="h-full w-full">
      <Container>
        <div className="grid h-full w-full grid-rows-[auto_1fr] pt-2">
          <div className="pb-1">
            {/*This is the top div that will hold the caret icons*/}
            {showSidebar ? (
              <ToggleSidebar onClick={() => setShowSidebar(false)} title="Hide sidebar">
                <CaretLeft className="inline-block w-full"></CaretLeft>
              </ToggleSidebar>
            ) : (
              <ToggleSidebar onClick={() => setShowSidebar(true)} title="Show sidebar">
                <CaretRight className="inline-block w-full"></CaretRight>
              </ToggleSidebar>
            )}
          </div>
          <div
            className={cn("relative grid h-full gap-3", {
              "grid-cols-1": !showSidebar,
              "md:grid-cols-[auto_1fr]": showSidebar,
            })}
          >
            <div
              className={cn("h-full max-h-screen", {
                "hidden": !showSidebar,
                "absolute left-0 top-0 z-10 block h-full w-4/5 max-w-xs rounded-xl bg-secondary-50 px-3 py-3 md:static md:h-auto md:w-full md:max-w-full md:overflow-y-auto md:rounded-none md:bg-white md:scrollbar-thin":
                  showSidebar,
              })}
            >
              <Sidebar />
            </div>
            <div className={cn("py-3", { "opacity-10 md:opacity-100": showSidebar })}>
              <SidebarContext.Provider value={sidebarContextValue}>{children}</SidebarContext.Provider>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
