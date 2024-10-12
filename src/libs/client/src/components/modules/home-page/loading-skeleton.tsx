import React from "react";
import { Skeleton } from "@radix-ui/themes";

export default function LoadingSkeleton() {
  return (
    <div className="flex w-full items-center justify-between gap-3 overflow-x-auto scrollbar-thin">
      <div className="grid h-56 w-36 grid-cols-1 grid-rows-[12rem_1fr_1fr] gap-y-2 sm:h-72 sm:grid-rows-[15rem_1fr_1fr]">
        {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
          <Skeleton key={i} className="block h-full w-full rounded-lg"></Skeleton>
        ))}
      </div>
      <div className="grid h-56 w-36 grid-cols-1 grid-rows-[12rem_1fr_1fr] gap-y-2 sm:h-72 sm:grid-rows-[15rem_1fr_1fr]">
        {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
          <Skeleton key={i} className="block h-full w-full rounded-lg"></Skeleton>
        ))}
      </div>
      <div className="grid h-56 w-36 grid-cols-1 grid-rows-[12rem_1fr_1fr] gap-y-2 sm:h-72 sm:grid-rows-[15rem_1fr_1fr]">
        {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
          <Skeleton key={i} className="block h-full w-full rounded-lg"></Skeleton>
        ))}
      </div>
      <div className="hidden h-56 w-36 grid-cols-1 grid-rows-[12rem_1fr_1fr] gap-y-2 xs:grid sm:h-72 sm:grid-rows-[15rem_1fr_1fr]">
        {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
          <Skeleton key={i} className="block h-full w-full rounded-lg"></Skeleton>
        ))}
      </div>
      <div className="hidden h-56 w-36 grid-cols-1 grid-rows-[12rem_1fr_1fr] gap-y-2 sm:grid sm:h-72 sm:grid-rows-[15rem_1fr_1fr]">
        {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
          <Skeleton key={i} className="block h-full w-full rounded-lg"></Skeleton>
        ))}
      </div>
      <div className="hidden h-56 w-36 grid-cols-1 grid-rows-[12rem_1fr_1fr] gap-y-2 sm:h-72 sm:grid-rows-[15rem_1fr_1fr] md:grid">
        {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
          <Skeleton key={i} className="block h-full w-full rounded-lg"></Skeleton>
        ))}
      </div>
    </div>
  );
}
