import React from "react";
import { Skeleton } from "@radix-ui/themes";

export default function LoadingSkeleton() {
  return (
    <div className="grid w-full grid-cols-[40px_1fr] grid-rows-[auto] gap-1 xs:grid-cols-[60px_1fr] max-lg:md:grid-cols-[50px_1fr]">
      <div className="aspect-square">
        <Skeleton className="block h-full w-full rounded-xl"></Skeleton>
      </div>
      <div className="grid grid-cols-1 grid-rows-[1fr_1fr] gap-[40%]">
        <div className="w-full">
          <Skeleton className="block h-full w-full rounded-xl"></Skeleton>
        </div>
        <div className="w-full">
          <Skeleton className="block h-full w-full rounded-xl"></Skeleton>
        </div>
      </div>
    </div>
  );
}
