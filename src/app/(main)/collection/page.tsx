import { ReactElement } from "react";
import { CollectionOverview } from "@/root/src/libs/client/src/components/modules/collection/collection-overview";
import { getUserSession } from "@/server/actions";
import { redirect } from "next/navigation";

export default async function Overview(): Promise<ReactElement> {
  const { user } = await getUserSession();

  if (!user) {
    redirect("/");
  }
  return <CollectionOverview user={user} />;
}
