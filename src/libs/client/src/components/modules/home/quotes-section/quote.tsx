import React, { ComponentProps } from "react";
import { cn } from "@/client/utils";

type QuoteProps = { author: string; quote: string } & ComponentProps<"div">;

export default function Quote({ author, quote, className, ...props }: QuoteProps) {
  return (
    <div className={cn("inline-block w-full", className)} {...props}>
      {author}
      {quote}
    </div>
  );
}
