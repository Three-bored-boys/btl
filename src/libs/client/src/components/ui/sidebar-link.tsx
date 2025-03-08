import React from "react";
import Link, { LinkProps } from "next/link";
import { cn } from "@/client/utils/utils";

type SidebarLinkProps = { currentPathname: string; name: string } & LinkProps & React.ComponentProps<"a">;

export function SidebarLink({ currentPathname, name, href, ...props }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={cn("rounded-xl px-4 py-1", {
        "bg-secondary-200": currentPathname === href,
        "hover:bg-secondary-100": currentPathname !== href,
      })}
      title={name}
      {...props}
    >
      {name}
    </Link>
  );
}
