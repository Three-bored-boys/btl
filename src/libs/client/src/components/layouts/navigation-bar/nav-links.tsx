import React from "react";
import NavLink from "./nav-link";
import { cn } from "@/client/utils";
import { NavLinkArr } from "./nav-bar";
import { cva, VariantProps } from "class-variance-authority";

const navLinks = cva("", {
  variants: {
    device: {
      mobile: "flex flex-col items-start justify-start gap-y-3",
      "no-mobile": "grid grid-cols-3 gap-x-1 md:gap-x-2 lg:gap-x-3",
    },
  },
});

export type NavLinksProps = React.ComponentProps<"div"> &
  VariantProps<typeof navLinks> & {
    routesArr: NavLinkArr;
  };

export default function NavLinks({
  device,
  routesArr,
  className,
  ...props
}: NavLinksProps): React.ReactElement {
  return (
    <div className={cn(navLinks({ device }), className)} {...props}>
      {routesArr.map((value, i) => (
        <NavLink routeObj={value} key={i} device={device} />
      ))}
    </div>
  );
}
