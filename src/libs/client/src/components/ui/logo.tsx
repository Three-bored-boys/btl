"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/client/utils";

type LogoProps = React.ComponentProps<"div">;

export default function Logo({ className, ...props }: LogoProps): React.ReactElement {
  return (
    <Link href="/">
      <div className={cn("text-3xl font-bold", className)} {...props}>
        B T L
      </div>
    </Link>
  );
}
