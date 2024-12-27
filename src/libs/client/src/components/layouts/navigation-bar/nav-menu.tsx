import React from "react";
import { cn } from "@/client/utils";

export function NavMenu({ className, children, ...props }: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div className={cn("absolute left-0 top-full z-20 w-full bg-white p-3 shadow-inner sm:p-4", className)} {...props}>
      {children}
    </div>
  );
}
