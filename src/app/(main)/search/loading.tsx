import React from "react";
import { SearchPageResultsLoadingSkeleton } from "@/client/components/modules/search-page/search-page-results-loading-skeleton";
import { Container } from "@/root/src/libs/client/src/components/layouts/container";
import { Spinner } from "@radix-ui/themes";

export default function SearchLoading() {
  return (
    <div>
      <Container>
        <div className="mb-3 flex h-52 w-full items-center justify-center">
          <Spinner size={"3"}></Spinner>
        </div>
        <SearchPageResultsLoadingSkeleton />
      </Container>
    </div>
  );
}
