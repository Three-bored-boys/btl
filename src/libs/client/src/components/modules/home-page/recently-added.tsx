import { SanitizedUser } from "@/root/src/libs/shared/src/db/schema";
import React from "react";
import { Container } from "@/client/components/layouts/container";
import { ExclamationTriangle } from "@/client/components/ui/icons/exclamation-triangle";
import { getRecentlyAddedBooks } from "@/server/actions";
import { BookCard } from "./book-card";
import { SectionPreamble } from "./section-preamble";

export async function RecentlyAdded({ user }: { user: SanitizedUser }) {}

const RecentlyAddedLayout = function ({ children }: { children: React.ReactNode }) {
  return (
    <section className="mb-20 w-full py-10">
      <Container>
        <SectionPreamble title="Recently Added Books To Collection">
          A brief overview of the latest books added to your collection
        </SectionPreamble>
        {children}
      </Container>
    </section>
  );
};
