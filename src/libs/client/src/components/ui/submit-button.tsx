import React from "react";
import { Button } from "./button";
import { Spinner } from "@radix-ui/themes";
import { cn } from "@/client/utils";

export function SubmitButton({
  isSubmitting,
  defaultText,
  submittingText,
}: {
  isSubmitting: boolean;
  defaultText: string;
  submittingText: string;
}) {
  return (
    <Button
      background={"light"}
      type="submit"
      disabled={isSubmitting}
      textSize={"small"}
      className={cn({ "cursor-not-allowed bg-secondary-100 hover:bg-secondary-200": isSubmitting })}
    >
      {isSubmitting ? (
        <span className="mx-auto flex items-center justify-start gap-2">
          <span>{submittingText}</span>
          <Spinner size={"1"}></Spinner>
        </span>
      ) : (
        <span className="mx-auto">{defaultText}</span>
      )}
    </Button>
  );
}
