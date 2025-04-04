import React from "react";
import { cn } from "@/client/utils";
import { indigo } from "tailwindcss/colors";

export function CaretLeft({ className, onClick, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      fill={indigo[950]}
      viewBox="7 -1 21 38"
      // viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-6 cursor-pointer", className)}
      onClick={onClick}
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M20.697 24L9.303 16.003 20.697 8z"></path>
      </g>
    </svg>
  );
}
