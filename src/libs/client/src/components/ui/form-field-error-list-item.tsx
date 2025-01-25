import React from "react";

export const FormFieldErrorListItem = function ({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<"li">) {
  return (
    <li className="leading-tight" {...props}>
      <span className="text-sm font-light italic text-error">{children}</span>
    </li>
  );
};
