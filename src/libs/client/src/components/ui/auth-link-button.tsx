"use client";

import React from "react";
import { useWindowLocationHref } from "@/client/hooks/window-location-href";
import { LinkButtonProps, LinkButton } from "./link-button";

export function AuthLinkButton(authLinkButtonProps: LinkButtonProps): React.ReactElement {
  const redirectUrl = useWindowLocationHref();
  const { href, children, ...props } = authLinkButtonProps;
  const newHref = `${href}?redirect=${encodeURIComponent(redirectUrl)}`;
  if (href === "/login" || href === "/signup") {
    return (
      <LinkButton href={newHref} {...props}>
        {children}
      </LinkButton>
    );
  }

  return (
    <LinkButton href={href} {...props}>
      {children}
    </LinkButton>
  );
}
