import { SanitizedUser } from "@/root/src/libs/shared/src/db/schema";
import React from "react";

export function RecentlyAdded({ user }: { user: SanitizedUser }) {
  console.log(user);

  return <div>recently added</div>;
}
