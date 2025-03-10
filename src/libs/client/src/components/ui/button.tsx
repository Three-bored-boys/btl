import { VariantProps } from "class-variance-authority";
import React from "react";
import { cn, button } from "@/client/utils";

export type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof button>;

export function Button({ className, children, background, textSize, ...props }: ButtonProps): React.ReactElement {
  return (
    <button className={cn(button({ background, textSize }), className)} {...props}>
      {children}
    </button>
  );
}
