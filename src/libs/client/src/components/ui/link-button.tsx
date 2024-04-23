import React from "react";
import { cn, ButtonVariants, button } from "@/client/utils";
import Link, { LinkProps } from "next/link";

type LinkButtonProps = ButtonVariants & LinkProps & React.ComponentProps<"a">;

export default function LinkButton({
  className,
  children,
  background,
  href,
  ...props
}: LinkButtonProps): React.ReactElement {
  return (
    <Link
      href={href}
      className={cn(button({ background }), className)}
      {...props}
    >
      {children}
    </Link>
  );
}
