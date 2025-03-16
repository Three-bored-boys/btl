"use client";

import React from "react";
import { NavLink } from "./nav-link";
import { cn } from "@/client/utils";
import { NavLinkArr } from "./nav-bar";
import { cva, VariantProps } from "class-variance-authority";
import { SanitizedUser } from "@/root/src/libs/shared/src/db/schema";
import { useRootPathnameContext } from "../../../hooks/root-pathname";

const navLinks = cva(["flex"], {
  variants: {
    device: {
      mobile: ["flex-col", "items-start", "justify-start", "gap-y-3"],
      "no-mobile": ["gap-x-0", "items-center", "justify-around"],
    },
  },
});

export type NavLinksProps = React.ComponentProps<"div"> &
  VariantProps<typeof navLinks> & {
    routesArr: NavLinkArr;
    user: SanitizedUser | null;
  };

export function NavLinks({ device, routesArr, className, user, ...props }: NavLinksProps): React.ReactElement {
  const { rootPathname } = useRootPathnameContext();
  const getRoutesArrayToRender = function () {
    if (user) {
      return routesArr;
    } else {
      return routesArr.filter((value) => value.path !== "/collection");
    }
  };

  return (
    <div className={cn(navLinks({ device }), className)} {...props}>
      {getRoutesArrayToRender().map((value, i) => (
        <NavLink routeObj={value} key={i} device={device} rootPathname={rootPathname} />
      ))}
    </div>
  );
}
