import React from "react";
import { cn } from "@/client/utils/utils";
import { indigo } from "tailwindcss/colors";

export function CaretRight({ className, onClick, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      fill={indigo[950]}
      viewBox="7 0 20 35"
      // viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-6 cursor-pointer", className)}
      onClick={onClick}
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M11.303 8l11.394 7.997L11.303 24z"></path>
      </g>
    </svg>
  );
}
