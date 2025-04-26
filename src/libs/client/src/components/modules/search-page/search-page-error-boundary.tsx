"use client";

import { Button } from "@/libs/client/src/components/ui/button";
import Image from "next/image";
import notFoundImage from "@/public/assets/images/not-found.webp";
import { ExclamationTriangle } from "@/client/components/ui/icons/exclamation-triangle";

export function SearchPageErrorBoundary({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="relative min-h-screen w-full">
      <div className="flex flex-col items-center justify-start gap-y-3 py-5">
        <ExclamationTriangle></ExclamationTriangle>
        <h2 className="mb-2 text-4xl radix-xs:text-5xl md:mb-5 md:text-7xl">
          Something has gone wrong with this request
        </h2>
        <p className="mb-8 text-base radix-xs:text-xl md:mb-3 md:text-2xl">{error.message}</p>
        <Button
          background={"light"}
          textSize={"big"}
          className="mb-28 radix-xs:mb-9"
          onClick={() => resetErrorBoundary()}
        >
          Try again
        </Button>
        <div>
          <Image src={notFoundImage} alt="Cartoon image of man sitting on floor and reading a book"></Image>
        </div>
      </div>
    </div>
  );
}
