import React, { ComponentProps } from "react";
import { cn } from "@/client/utils";

type QuoteProps = { author: string; quote: string } & ComponentProps<"div">;

export default function Quote({ author, quote, className, ...props }: QuoteProps) {
  return (
    <div className={cn("inline-block w-full", className)} {...props}>
      <div>
        <q className="inline-block">{quote}</q>
      </div>
      <div>{author}</div>
    </div>
  );
}
