import * as Root from "@radix-ui/react-label";
import React, { ComponentProps } from "react";
import { cn } from "../../utils";

type LabelProps = ComponentProps<"label">;

export default function Label({ htmlFor, children, className, ...props }: LabelProps) {
  return (
    <Root.Root htmlFor={htmlFor} className={cn("text-base", className)} {...props}>
      {children}
    </Root.Root>
  );
}
