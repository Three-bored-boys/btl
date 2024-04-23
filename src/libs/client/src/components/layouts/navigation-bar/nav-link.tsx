import React, { ComponentProps } from "react";
import { cn } from "@/libs/client/src/utils";
import type { NavLinkArr } from "./nav-bar";
import Link from "next/link";
import { cva, VariantProps } from "class-variance-authority";

const navLink = cva("block h-full w-full border-b-2 border-transparent text-center font-light hover:text-selected", {
  variants: {
    device: {
      mobile: "pr-2 text-left text-sm",
      "no-mobile": "w-28 text-base lg:w-36 lg:text-xl",
    },
  },
});

export type NavLinkProps = ComponentProps<"span"> &
  VariantProps<typeof navLink> & {
    routeObj: NavLinkArr[number];
    rootPathname: string;
  };

export default function NavLink({
  className,
  routeObj,
  device,
  rootPathname,
  ...props
}: NavLinkProps): React.ReactElement {
  return (
    <span {...props}>
      <Link
        href={routeObj.path}
        className={cn(
          navLink({ device }),
          { "border-b-primary-selected text-primary-selected": routeObj.path === rootPathname },
          className,
        )}
      >
        {routeObj.name}
      </Link>
    </span>
  );
}
