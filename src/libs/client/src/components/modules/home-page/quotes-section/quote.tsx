import React, { ComponentProps } from "react";
import { cn } from "@/client/utils/utils";

type QuoteProps = { author: string; quote: string } & ComponentProps<"div">;

export function Quote({ author, quote, className, ...props }: QuoteProps) {
  return (
    <div className={cn("min-w-0 flex-[0_0_100%]", className)} {...props}>
      <q className="mb-5 inline-block w-full text-wrap text-center text-base font-medium italic xs:text-lg sm:text-xl md:text-2xl lg:text-3xl">
        {quote}
      </q>
      <div className="text-center text-sm font-normal sm:text-base md:text-lg lg:text-xl">- {author}</div>
    </div>
  );
}
