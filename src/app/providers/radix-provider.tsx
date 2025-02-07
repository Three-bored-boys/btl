import { Theme } from "@radix-ui/themes";
import React from "react";

export function RadixProvider({ children }: { children: React.ReactNode }): React.ReactNode {
  return <Theme>{children}</Theme>;
}
