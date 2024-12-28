import React from "react";
import Link, { LinkProps } from "next/link";
import { cn } from "../../utils";

type SidebarLinkProps = { currentPathname: string; name: string } & LinkProps & React.ComponentProps<"a">;

export function SidebarLink({ currentPathname, name, href }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={cn("px-4 py-1", {
        "bg-primary-100": currentPathname === href,
        "hover:bg-primary-50": currentPathname !== href,
      })}
      title={name}
    >
      {name}
    </Link>
  );
}
