import React from "react";
import { Skeleton } from "@radix-ui/themes";

export function SearchPageResultsLoadingSkeleton() {
  return (
    <div className="my-6 grid w-full gap-4 px-12 xs:grid-cols-2 xs:px-5 radix-xs:px-12 md:grid-cols-4 md:px-1 lg:px-12 xl:px-32">
      {Array.from({ length: 12 }, (_, i) => i).map((_, i) => (
        <div key={i} className="flex aspect-square flex-col items-center justify-between">
          <div className="h-4/5 w-full px-[28%]">
            <Skeleton className="block h-full w-full"></Skeleton>
          </div>
          <Skeleton className="block h-3 w-full sm:h-5 md:h-3"></Skeleton>
          <Skeleton className="block h-3 w-full sm:h-5 md:h-3"></Skeleton>
        </div>
      ))}
    </div>
  );
}
