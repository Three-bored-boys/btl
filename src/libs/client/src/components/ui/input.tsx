import React, { ComponentProps, forwardRef } from "react";
import { cn } from "@/client/utils";

type InputProps = ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(function InputRef(props, ref) {
  const { id, className, type, children, ...otherProps } = props;
  return (
    <input
      id={id}
      className={cn(
        "rounded-none border-2 border-primary-50 px-1 text-base outline-none focus:border-primary focus:outline-0",
        className,
      )}
      type={type}
      ref={ref}
      {...otherProps}
    >
      {children}
    </input>
  );
});
