import React from "react";
import { cn, ButtonVariants, button } from "@/client/utils";
import Link, { LinkProps } from "next/link";

type LinkButtonProps = ButtonVariants & LinkProps & React.ComponentProps<"a">;

export function LinkButton({
  className,
  children,
  background,
  textSize,
  href,
  ...props
}: LinkButtonProps): React.ReactElement {
  return (
    <Link href={href} className={cn(button({ background, textSize }), className)} {...props}>
      {children}
    </Link>
  );
}
