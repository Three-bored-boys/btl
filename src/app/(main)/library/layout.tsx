"use client";

import { Container } from "@/root/src/libs/client/src/components/layouts/container";
import { ReactElement } from "react";
import { CaretRight } from "@/root/src/libs/client/src/components/ui/icons/caret-right";
import { CaretLeft } from "@/root/src/libs/client/src/components/ui/icons/caret-left";
import React from "react";
import { cn } from "@/root/src/libs/client/src/utils";
import { Sidebar } from "@/client/components/modules/library-page/sidebar";
import { ToggleSidebar } from "@/client/components/ui/toggle-sidebar";

export default function LibraryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  const [showSidebar, setShowSidebar] = React.useState(true);

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
            className={cn("relative grid gap-3", {
              "grid-cols-1": !showSidebar,
              "grid-cols-[auto_1fr]": showSidebar,
            })}
          >
            <div
              className={cn({
                "hidden": !showSidebar,
                "block h-full pr-3": showSidebar,
              })}
            >
              <Sidebar />
            </div>
            <div>{children}</div>
          </div>
        </div>
      </Container>
    </div>
  );
}
