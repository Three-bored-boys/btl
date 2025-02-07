import React from "react";

export const FormErrorListItem = function ({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<"li">) {
  return (
    <li className="leading-tight" {...props}>
      <span className="text-sm font-light italic text-error">{children}</span>
    </li>
  );
};
