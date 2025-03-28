import React, { ComponentProps } from "react";
import type { NavAuthLinkArr } from "./nav-bar";
import { AuthLinkButton } from "@/client/components/ui/auth-link-button";
import { cn } from "@/client/utils";
import { Avatar, DropdownMenu } from "@radix-ui/themes";
import avatarImage from "@/public/assets/images/avatar.png";
import { Logout } from "@/client/components/modules/auth/logout/logout";
import { getUserSession } from "@/server/actions";

type NavBarRightProps = {
  routesArr: NavAuthLinkArr;
} & ComponentProps<"div">;

export async function NavBarRight({ routesArr, className }: NavBarRightProps): Promise<React.ReactElement> {
  const { user } = await getUserSession();

  return (
    <div className="flex items-center">
      {!user ? (
        <div className={cn("m-auto", className)}>
          <AuthLinkButton background={"dark"} href={routesArr[0].path} textSize={"big"}>
            {routesArr[0].name}
          </AuthLinkButton>
          <AuthLinkButton
            background={"light"}
            href={routesArr[1].path}
            className="text ml-2 hidden md:inline lg:ml-4"
            textSize={"big"}
          >
            {routesArr[1].name}
          </AuthLinkButton>
        </div>
      ) : (
        <div className="ml-1 cursor-pointer md:ml-10 xl:ml-20">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <div className="flex items-center" title={`Hi ${user.userName}`}>
                <span className="mx-auto my-auto inline-block w-24 truncate text-base xs:w-28 lg:text-lg">
                  Hi, <span className="font-medium">{user.userName}</span>
                </span>
                <Avatar fallback="" src={avatarImage.src} radius="full" className="ml-2"></Avatar>
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="w-40 sm:w-48">
              <Logout />
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      )}
    </div>
  );
}
