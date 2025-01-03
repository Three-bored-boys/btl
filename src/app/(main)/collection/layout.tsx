import React from "react";
import { CollectionLayout } from "@/client/components/modules/collection-page/collection-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return <CollectionLayout>{children}</CollectionLayout>;
}
