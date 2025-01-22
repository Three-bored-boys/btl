"use client";

import { Container } from "@/libs/client/src/components/layouts/container";
import { Button } from "@/libs/client/src/components/ui/button";
import Image from "next/image";
import notFoundImage from "@/public/assets/images/not-found.webp";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  error.digest = error.message;

  return (
    <>
      <div className="relative min-h-screen w-full">
        <Container>
          <div className="flex flex-col items-center justify-start gap-y-3 py-5">
            <p className="mb-3 text-8xl font-extralight md:mb-9 md:text-9xl">Error emoji</p>
            <h2 className="mb-2 text-4xl radix-xs:text-5xl md:mb-5 md:text-7xl">
              Something has gone wrong with this request
            </h2>
            <Button background={"light"} textSize={"big"} className="mb-28 radix-xs:mb-9" onClick={() => reset()}>
              Try again
            </Button>
            <div>
              <Image src={notFoundImage} alt="Cartoon image of man sitting on floor and reading a book"></Image>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
