import React from "react";
import { CollectionLayout } from "@/client/components/modules/collection/collection-layout";
import { getUserSession } from "@/root/src/libs/server/src/auth/utils";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactElement> {
  const { user } = await getUserSession();
  if (!user) {
    redirect("/");
  }

  return <CollectionLayout>{children}</CollectionLayout>;
}
