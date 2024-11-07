import React, { ComponentProps, forwardRef } from "react";
import { cn } from "../../utils";

type InputProps = ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(function InputRef(props, ref) {
  const { id, className, type, children, ...otherProps } = props;
  return (
    <input
      id={id}
      className={cn(
        "rounded-none border-2 border-primary-50 p-1 text-base outline-none focus:outline-1 focus:outline-offset-1 focus:outline-primary",
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

export default Input;
