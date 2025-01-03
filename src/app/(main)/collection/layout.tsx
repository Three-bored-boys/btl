import React from "react";
import { LibraryLayout } from "@/client/components/modules/library-page/library-layout";

export default function CollectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return <LibraryLayout>{children}</LibraryLayout>;
}
