import React from "react";
import { OverviewLibraryPreviewSection } from "./overview-library-preview-section";
import { bookLibraries } from "@/shared/utils";
import { SanitizedUser } from "@/root/src/libs/shared/src/db/schema";
import { getUserBooksInALibrary } from "@/root/src/libs/server/src/actions";

export function CollectionOverview({ user }: { user: SanitizedUser }) {
  return (
    <div>
      <h1 className="font-semibold">Overview</h1>
      {bookLibraries.map(async (library, i) => {
        const serverResult = await getUserBooksInALibrary({ library: library.value, limit: 6, userId: user.id });
        return (
          <OverviewLibraryPreviewSection name={library.name} slug={library.value} serverResult={serverResult} key={i} />
        );
      })}
    </div>
  );
}
