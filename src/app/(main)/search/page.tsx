import SearchPage from "@/root/src/libs/client/src/components/modules/search-page/search-page";
import React, { Suspense } from "react";

function Search() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}

export default Search;
