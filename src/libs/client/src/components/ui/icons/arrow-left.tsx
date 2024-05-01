import React from "react";
import { cn } from "@/client/utils";

type ArrowLeftProps = React.ComponentProps<"svg">;

export default function ArrowLeft({ className, onClick, ...props }: ArrowLeftProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("h-10 w-10 cursor-pointer", className)}
      onClick={onClick}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}
