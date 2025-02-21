import React, { ComponentProps } from "react";
import type { NavAuthLinkArr } from "./nav-bar";
import { LinkButton } from "@/client/components/ui/link-button";
import { cn } from "@/client/utils";
import { useAuthContext } from "@/client/providers/auth-context-provider";
import { Avatar, DropdownMenu } from "@radix-ui/themes";

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

  return (
    <div className="ml-1 cursor-pointer md:ml-10 xl:ml-20">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="flex items-center">
            <span className="mx-auto my-auto inline-block w-24 truncate xs:w-28">Hi, {user.userName}</span>
            <Avatar fallback src="" radius="full" className="ml-2"></Avatar>
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Hello</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
