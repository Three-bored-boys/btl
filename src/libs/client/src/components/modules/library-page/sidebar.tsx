import React from "react";
import { usePathname } from "next/navigation";
import { bookLocations } from "@/client/utils";
import { SidebarLink } from "@/client/components/ui/sidebar-link";

export function Sidebar(
  props: React.ComponentProps<"nav"> & {
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  },
) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav {...props} className="flex h-full w-full flex-col gap-3">
      <SidebarLink
        href="/library"
        currentPathname={pathname}
        name="Overview"
        onClick={() => props.setShowSidebar(false)}
      />
      <h2 className="mt-5 text-2xl font-medium italic">Libraries</h2>
      {bookLocations.map((location, i) => (
        <SidebarLink
          href={`/library/${location.value}`}
          key={i}
          name={location.name}
          currentPathname={pathname}
          onClick={() => props.setShowSidebar(false)}
        />
      ))}
    </nav>
  );
}
