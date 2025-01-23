import { ReactElement } from "react";
import React from "react";
import { Logo } from "@/client/components/ui/logo";
import { cn } from "@/libs/client/src/utils";

export function AuthPage({ children }: { children: React.ReactNode }): ReactElement {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="px-10 py-20 xs:px-16 sm:px-28 md:px-10 lg:px-24 xl:px-40">{children}</div>
      <div className="block pb-5 pl-5 md:hidden">
        <Logo className={cn("text-5xl md:hidden")} />
      </div>
    </div>
  );
}
