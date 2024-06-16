import React, { ComponentProps } from "react";
import { cn } from "@/client/utils";

type QuoteProps = { author: string; quote: string } & ComponentProps<"div">;

export default function Quote({ author, quote, className, ...props }: QuoteProps) {
  return (
    <div className={cn("inline-block", className)} {...props}>
      <div className="mb-5 text-wrap text-center font-medium">
        <q className="inline-block w-full text-base italic xs:text-lg sm:text-xl md:text-2xl lg:text-3xl">{quote}</q>
      </div>
      <div className="text-center text-sm font-normal sm:text-base md:text-lg lg:text-xl">- {author}</div>
    </div>
  );
}
