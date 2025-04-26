import React from "react";
import { usePathname } from "next/navigation";
import { bookLibraries } from "@/shared/utils";
import { SidebarLink } from "@/client/components/ui/sidebar-link";

export function Sidebar(props: React.ComponentProps<"nav">) {
  const pathname = usePathname();

  return (
    <nav {...props} className="flex h-full w-full flex-col gap-3 overflow-y-auto scrollbar-thin">
      <SidebarLink href="/collection" currentPathname={pathname} name="Overview" />
      <h2 className="mt-5 text-2xl font-medium italic">Libraries</h2>
      {bookLibraries.map((library, i) => (
        <SidebarLink
          href={`/collection/${library.value}?page=1`}
          key={i}
          name={library.name}
          currentPathname={pathname}
        />
      ))}
    </nav>
  );
}
