import { Container } from "@/libs/client/src/components/layouts/container";
import { Button } from "@/root/src/libs/client/src/components/ui/button";
import notFoundImage from "@/public/assets/images/not-found.webp";
import NextImage from "next/image";
import { NOT_FOUND_IMAGE_ALT } from "@/shared/utils";

export function BookPageErrorBoundaryRender({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="relative min-h-screen w-full">
      <Container>
        <div className="flex flex-col items-center justify-start gap-y-3 py-5">
          <h2 className="mb-2 text-4xl radix-xs:text-5xl md:mb-5 md:text-7xl">Oops! Something has gone wrong!</h2>
          <p className="mb-8 text-base radix-xs:text-xl md:mb-3 md:text-2xl">{error.message}</p>
          <Button onClick={reset} background={"light"} textSize={"big"} className="mb-2">
            Try again
          </Button>
          <div>
            <NextImage src={notFoundImage} alt={NOT_FOUND_IMAGE_ALT}></NextImage>
          </div>
        </div>
      </Container>
    </div>
  );
}
