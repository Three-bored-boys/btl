import React from "react";
import { usePathname } from "next/navigation";
import { bookLocations } from "@/client/utils";
import { SidebarLink } from "@/client/components/ui/sidebar-link";

export function Sidebar(props: React.ComponentProps<"nav">) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav {...props} className="flex h-full w-full flex-col gap-3">
      <SidebarLink href="/library" currentPathname={pathname} name="Overview" />
      {bookLocations.map((location, i) => (
        <SidebarLink href={`/library/${location.value}`} key={i} name={location.name} currentPathname={pathname} />
      ))}
    </nav>
  );
}
