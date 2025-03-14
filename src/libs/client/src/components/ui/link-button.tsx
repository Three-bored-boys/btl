"use client";

import React from "react";
import { cn, ButtonVariants, button } from "@/client/utils";
import Link, { LinkProps } from "next/link";
import { useWindowLocationHref } from "@/client/hooks/window-location-href";

type LinkButtonProps = ButtonVariants & LinkProps & React.ComponentProps<"a">;

export function LinkButton({
  className,
  children,
  background,
  textSize,
  href,
  ...props
}: LinkButtonProps): React.ReactElement {
  const redirectUrl = useWindowLocationHref();
  const newHref = `${href}?redirect=${encodeURIComponent(redirectUrl)}`;
  return (
    <Link href={newHref} className={cn(button({ background, textSize }), className)} {...props}>
      {children}
    </Link>
  );
}
