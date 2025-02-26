import { Container } from "@/client/components/layouts/container";
import { Skeleton } from "@radix-ui/themes";
import React from "react";

export function BookPageLoadingSkeleton() {
  return (
    <div className="mt-5">
      <Container>
        <div className="grid w-full grid-cols-1 gap-4 px-6 sm:grid-cols-[11rem_1fr] sm:gap-7 sm:px-3 md:grid-cols-[12rem_1fr] md:gap-10 lg:grid-cols-[14.5rem_1fr] lg:gap-16 xl:grid-cols-[16rem_1fr] xl:gap-20 2xl:grid-cols-[18rem_1fr] 2xl:gap-28">
          <div className="mx-auto aspect-[10/16] w-2/4 sm:w-full">
            <Skeleton width={"100%"} height={"100%"}></Skeleton>
          </div>
          <div>
            <Skeleton className="mx-auto mb-4 block h-6 max-w-28 rounded-xl sm:mx-0 md:mb-5"></Skeleton>
            <Skeleton className="mb-4 block h-8 w-full rounded-xl md:mb-5 md:h-9"></Skeleton>
            <Skeleton className="mx-auto mb-4 block h-7 max-w-60 rounded-xl radix-xs:max-w-96 sm:mx-0 md:mb-5 md:h-8"></Skeleton>
            <Skeleton className="mb-0.5 block h-6 w-full rounded-xl"></Skeleton>
            <Skeleton className="mb-4 block h-6 w-full rounded-xl"></Skeleton>
            <Skeleton className="mb-4 block h-6 max-w-28 rounded-xl md:mb-6 "></Skeleton>
            <div className="grid w-full grid-cols-1 gap-4 radix-xs:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }, (_, i) => i).map((_, i) => (
                <Skeleton key={i} className="block h-11 w-full rounded-xl"></Skeleton>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
