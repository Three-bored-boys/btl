"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

function SearchPage() {
  const searchParams = useSearchParams();
  if (searchParams.has("run")) return <div>yessirrr you can run</div>;

  return <div>You cannot run mate</div>;
}

export default SearchPage;
