"use client";

import { cn } from "@/client/utils";
import ArrowLeftCircle from "@/client/components/ui/icons/arrow-left-circle";
import ArrowRightCircle from "@/client/components/ui/icons/arrow-right-circle";
import Container from "@/client/components/layouts/container";
import { useState } from "react";

export default function QuotesSection() {
  const [index, setIndex] = useState<number>(0);

  const nextQuote = function () {
    if (index < 2 && index >= 0) {
      setIndex((i) => i + 1);
    } else {
      setIndex(0);
    }
  };

  const prevQuote = function () {
    if (index <= 2 && index > 0) {
      setIndex((i) => i - 1);
    } else {
      setIndex(2);
    }
  };

  return (
    <section>
      <Container>
        <div className="overflow-hidden whitespace-nowrap">
          <div
            className={cn(
              "transition-transform duration-1000",
              { "translate-x-[0%]": index === 0 },
              { "translate-x-[-100%]": index === 1 },
              { "translate-x-[-200%]": index === 2 },
            )}
          >
            <span className="inline-block h-10 w-full bg-red-600"></span>
            <span className="inline-block h-10 w-full bg-blue-600"></span>
            <span className="inline-block h-10 w-full bg-green-600"></span>
          </div>
        </div>
        <div className={cn("mt-5 flex w-full items-center justify-center")}>
          <span className={cn("mr-9 flex cursor-pointer items-center")} onClick={prevQuote}>
            <ArrowLeftCircle />
          </span>
          <span className={cn("flex cursor-pointer items-center")} onClick={nextQuote}>
            <ArrowRightCircle />
          </span>
        </div>
      </Container>
    </section>
  );
}
