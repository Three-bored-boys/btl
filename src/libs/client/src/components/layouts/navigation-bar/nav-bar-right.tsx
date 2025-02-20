import React, { ComponentProps } from "react";
import type { NavAuthLinkArr } from "./nav-bar";
import { LinkButton } from "@/client/components/ui/link-button";
import { cn } from "@/client/utils";
import { useAuthContext } from "@/client/providers/auth-context-provider";
import { Avatar } from "@radix-ui/themes";

type NavBarRightProps = {
  routesArr: NavAuthLinkArr;
} & ComponentProps<"div">;

export function NavBarRight({ routesArr, className }: NavBarRightProps): React.ReactElement {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <div className={cn("m-auto", className)}>
        <LinkButton background={"dark"} href={routesArr[0].path} textSize={"big"}>
          {routesArr[0].name}
        </LinkButton>
        <LinkButton
          background={"light"}
          href={routesArr[1].path}
          className="text ml-2 hidden md:inline lg:ml-4"
          textSize={"big"}
        >
          {routesArr[1].name}
        </LinkButton>
      </div>
    );
  }

  return <Avatar fallback>Hi, {user.userName}</Avatar>;
}
