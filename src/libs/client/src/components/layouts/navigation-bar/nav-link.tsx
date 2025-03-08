import React, { ComponentProps } from "react";
import { cn } from "@/libs/client/src/utils/utils";
import type { NavLinkArr } from "./nav-bar";
import Link from "next/link";
import { cva, VariantProps } from "class-variance-authority";

const navLink = cva(["block", "h-full", "w-full", "border-b-2", "border-transparent", "text-center", "font-light"], {
  variants: {
    device: {
      mobile: ["pr-2", "text-left", "text-sm"],
      "no-mobile": ["text-base", "lg:text-xl", "px-2"],
    },
  },
});

export type NavLinkProps = ComponentProps<"span"> &
  VariantProps<typeof navLink> & {
    routeObj: NavLinkArr[number];
    rootPathname: string;
  };

export function NavLink({ className, routeObj, device, rootPathname, ...props }: NavLinkProps): React.ReactElement {
  return (
    <span {...props}>
      <Link
        href={routeObj.path}
        className={cn(navLink({ device }), { "border-b-primary-200": routeObj.path === rootPathname }, className)}
      >
        {routeObj.name}
      </Link>
    </span>
  );
}
