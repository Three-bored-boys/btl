import { Container } from "@/client/components/layouts/container";
// import genericBookImage from "@/public/assets/images/generic-book.png";
import { Skeleton } from "@radix-ui/themes";
// import Image from "next/image";
import React from "react";

export default function BookPageLoadingSkeleton() {
  return (
    <div className="mt-5">
      <Container>
        <div className="grid w-full grid-cols-1 gap-4 px-6 sm:grid-cols-[11rem_1fr] sm:gap-7 sm:px-3 md:grid-cols-[12rem_1fr] md:gap-10 lg:grid-cols-[14.5rem_1fr] lg:gap-16 xl:grid-cols-[16rem_1fr] xl:gap-20 2xl:grid-cols-[18rem_1fr] 2xl:gap-28">
          <Skeleton className="mx-auto block aspect-[10/16] w-2/4 border-[1px] border-gray-950 sm:w-full"></Skeleton>
          <div className="truncate text-pretty"></div>
        </div>
      </Container>
    </div>
  );
}
