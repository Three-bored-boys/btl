import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { bookLocations, cn } from "@/client/utils";

export function Sidebar(props: React.ComponentProps<"nav">) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav {...props} className="flex w-full flex-col gap-1">
      <Link
        href="/library/"
        className={cn("rounded-lg px-2", {
          "bg-primary-100": pathname === "/library",
          "hover:bg-primary-50": pathname !== "/library",
        })}
        title="Overview"
      >
        Overview
      </Link>
      {bookLocations.map((location, i) => (
        <Link
          href={`/library/${location.value}`}
          key={i}
          title={location.name}
          className={cn("rounded-lg px-2", { "bg-primary-200": pathname === `/library/${location.value}` })}
        >
          {location.name}
        </Link>
      ))}
    </nav>
  );
}
