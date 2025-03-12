import { type NavLinkArr } from "./nav-bar";
import { getUserSession } from "@/server/actions";
import { NavLinks } from "./nav-links";

export const NavBarMainLinks = async function ({ navLinkArr }: { navLinkArr: NavLinkArr }) {
  const { user } = await getUserSession();

  return (
    <div className="hidden md:flex md:items-center">
      <NavLinks device={"no-mobile"} routesArr={navLinkArr} className="w-full" user={user} />
    </div>
  );
};
