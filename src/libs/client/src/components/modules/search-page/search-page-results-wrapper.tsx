import { useSearchParams } from "next/navigation";
import React from "react";

export default function SearchPageResultsWrapper() {
  const searchParams = useSearchParams();

  return <div>{searchParams.has("run") ? "Can Run babyyyy" : "Cannot run"}</div>;
}
