import React from "react";
import { SearchPageResultsLoadingSkeleton } from "@/client/components/modules/search-page/search-page-results-loading-skeleton";
import { Container } from "@/root/src/libs/client/src/components/layouts/container";
import { Skeleton } from "@radix-ui/themes";

export default function SearchLoading() {
  return (
    <div>
      <Container>
        <div className="mb-3 w-full">
          <Skeleton className="block h-6 w-full" />
        </div>
        <SearchPageResultsLoadingSkeleton />
      </Container>
    </div>
  );
}
