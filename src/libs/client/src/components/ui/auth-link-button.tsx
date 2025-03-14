"use client";

import React from "react";
import { useWindowLocationHref } from "@/client/hooks/window-location-href";
import { LinkButtonProps, LinkButton } from "./link-button";

export function AuthLinkButton(authLinkButtonProps: LinkButtonProps): React.ReactElement {
  const redirectUrl = useWindowLocationHref();
  const { href: authLink, children, ...props } = authLinkButtonProps;
  const newHref = `${authLink}?redirect=${encodeURIComponent(redirectUrl)}`;
  return (
    <LinkButton href={newHref} {...props}>
      {children}
    </LinkButton>
  );
}
