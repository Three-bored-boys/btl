import React from "react";
import { NavLink } from "./nav-link";
import { cn } from "@/client/utils";
import { NavLinkArr } from "./nav-bar";
import { cva, VariantProps } from "class-variance-authority";
import { useAuthContext } from "@/client/hooks";

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
    rootPathname: string;
  };

export function NavLinks({ device, routesArr, className, rootPathname, ...props }: NavLinksProps): React.ReactElement {
  const { user } = useAuthContext();

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
