import React from "react";

export function ToggleSidebar({ onClick, children, title, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className="inline-block w-fit rounded-sm border border-primary pl-1 hover:cursor-pointer hover:bg-primary-100"
      onClick={onClick}
      {...props}
      title={title}
    >
      <span className="block border-l border-primary">{children}</span>
    </span>
  );
}
