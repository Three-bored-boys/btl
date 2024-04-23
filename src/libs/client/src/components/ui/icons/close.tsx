import React from "react";
import { cn } from "@/client/utils";

type CloseProps =  React.ComponentProps<"svg">;

export default function Close({ className, onClick }: CloseProps): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("h-6 w-6 cursor-pointer", className)}
      onClick={onClick}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}