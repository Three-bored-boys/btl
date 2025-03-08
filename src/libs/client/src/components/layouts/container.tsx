import { ComponentProps, ReactElement } from "react";
import { containerStyleClasses, cn } from "@/client/utils/utils";

export function Container({ className, children, ...props }: ComponentProps<"div">): ReactElement {
  return (
    <div className={cn(containerStyleClasses, className)} {...props}>
      {children}
    </div>
  );
}
