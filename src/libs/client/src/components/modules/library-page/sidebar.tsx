import React from "react";
import { usePathname } from "next/navigation";
import { bookLocations } from "@/client/utils";
import { SidebarLink } from "@/client/components/ui/sidebar-link";

export function Sidebar(props: React.ComponentProps<"nav">) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav {...props} className="flex h-full w-full flex-col gap-3 overflow-y-auto scrollbar-thin">
      <SidebarLink href="/library" currentPathname={pathname} name="Overview" />
      <h2 className="mt-5 text-2xl font-medium italic">Libraries</h2>
      {bookLocations.map((location, i) => (
        <SidebarLink href={`/library/${location.value}`} key={i} name={location.name} currentPathname={pathname} />
      ))}
    </nav>
  );
}
