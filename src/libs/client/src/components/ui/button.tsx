import { VariantProps } from "class-variance-authority";
import React from "react";
import { cn, button } from "@/client/utils";



type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof button>;

export default function Button({
  className,
  children,
  background,
  ...props
}: ButtonProps): React.ReactElement {
  return (
    <button className={cn(button({ background }), className)} {...props}>
      {children}
    </button>
  );
}
