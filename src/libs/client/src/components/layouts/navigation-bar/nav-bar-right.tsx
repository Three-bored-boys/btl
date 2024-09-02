import React from "react";
import type { NavAuthLinkArr } from "./nav-bar";
import LinkButton from "@/client/components/ui/link-button";

type NavBarRightProps = {
  routesArr: NavAuthLinkArr;
};

function NavBarRight({ routesArr }: NavBarRightProps): React.ReactElement {
  return (
    <div>
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

export default NavBarRight;
