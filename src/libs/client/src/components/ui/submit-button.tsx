import React from "react";
import { Button } from "./button";
import { Spinner } from "@radix-ui/themes";
import { cn } from "@/client/utils";
import { ButtonProps } from "@/client/components/ui/button";

type SubmitButtonProps = ButtonProps & {
  isSubmitting: boolean;
  defaultText: string;
  submittingText: string;
};

export function SubmitButton({
  isSubmitting,
  defaultText,
  submittingText,
  textSize,
  background,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      background={background}
      type="submit"
      disabled={isSubmitting}
      textSize={textSize}
      className={cn({
        "cursor-not-allowed": isSubmitting,
        "bg-secondary-100 hover:bg-secondary-200": background === "light",
        "bg-primary-100 hover:bg-primary-200": background === "dark",
      })}
      {...props}
    >
      <span
        className={cn(
          "mx-auto flex items-center justify-start gap-2",
          {
            "text-secondary-50": background === "dark",
            "text-primary": background === "light",
          },
          {
            "text-secondary-50": background === "dark" && isSubmitting,
            "text-primary": background === "light" && isSubmitting,
          },
        )}
      >
        {isSubmitting ? (
          <>
            {submittingText}
            <Spinner size={"1"}></Spinner>
          </>
        ) : (
          defaultText
        )}
      </span>
    </Button>
  );
}
