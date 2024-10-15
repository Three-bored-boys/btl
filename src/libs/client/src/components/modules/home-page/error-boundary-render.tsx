"use client";

import Button from "../../ui/button";

export default function ErrorBoundaryRender({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="w-full">
      <p>Something went wrong: {error.message}</p>
      <Button background={"light"} onClick={resetErrorBoundary} textSize={"big"}>
        Try again
      </Button>
    </div>
  );
}
