import { type NavLinkArr } from "./nav-bar";
import { getUserSession } from "@/root/src/libs/server/src/auth/utils";
import { NavMenuMobile } from "./nav-menu-mobile";

export const NavMenuMobileWrapper = async function ({ navLinkArr }: { navLinkArr: NavLinkArr }) {
  const { user } = await getUserSession();

  return <NavMenuMobile navLinkArr={navLinkArr} user={user}></NavMenuMobile>;
};
