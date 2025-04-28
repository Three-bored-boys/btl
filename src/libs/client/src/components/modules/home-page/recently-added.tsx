import { SanitizedUser } from "@/root/src/libs/shared/src/db/schema";
import React from "react";
import { Container } from "@/client/components/layouts/container";

export async function RecentlyAdded({ user }: { user: SanitizedUser }) {
  console.log("Currently in the RecentlyAdded component");

  return (
    <section className="w-full py-10">
      <Container>Recently added</Container>
    </section>
  );
}
