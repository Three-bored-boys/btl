"use client";

import { Button } from "../../ui/button";
import { ExclamationTriangle } from "../../ui/icons/exclamation-triangle";

export function ErrorBoundaryRender({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="my-2 flex w-full flex-col items-center justify-start gap-y-1">
      <ExclamationTriangle />
      <p className="text-xl font-semibold">Something went wrong</p>
      <p className="text-base font-normal">{error.message}</p>
      <Button background={"light"} onClick={resetErrorBoundary} textSize={"big"}>
        Try again
      </Button>
    </div>
  );
}
