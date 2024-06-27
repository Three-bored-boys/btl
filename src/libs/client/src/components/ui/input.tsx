import React, { ComponentProps } from "react";
import { cn } from "../../utils";

type InputProps = ComponentProps<"input">;

export default function Input({ id, children, className, type, ...props }: InputProps) {
  return (
    <input
      id={id}
      className={cn(
        "rounded-none border-2 border-primary-50 p-1 text-base outline-none focus:outline-1 focus:outline-offset-1 focus:outline-primary",
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </input>
  );
}
