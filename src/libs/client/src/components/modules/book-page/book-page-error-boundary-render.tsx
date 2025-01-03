import { Container } from "@/libs/client/src/components/layouts/container";
import { LinkButton } from "@/root/src/libs/client/src/components/ui/link-button";
import notFoundImage from "@/public/assets/images/not-found.webp";
import Image from "next/image";

export function BookPageErrorBoundaryRender({ error }: { error: Error }) {
  const status = error.cause as number;

  console.log(error.message, error);

  return (
    <div className="relative min-h-screen w-full">
      <Container>
        <div className="flex flex-col items-center justify-start gap-y-3 py-5">
          <p className="mb-3 text-8xl font-extralight md:mb-9 md:text-9xl">{status}</p>
          <h2 className="mb-2 text-4xl radix-xs:text-5xl md:mb-5 md:text-7xl">Oops! Something has gone wrong!</h2>
          <p className="mb-8 text-base radix-xs:text-xl md:mb-3 md:text-2xl">{error.message}</p>
          <LinkButton href="/" background={"light"} textSize={"big"} className="mb-2">
            Return Home
          </LinkButton>
          <div>
            <Image src={notFoundImage} alt="Cartoon image of man sitting on floor and reading a book"></Image>
          </div>
        </div>
      </Container>
    </div>
  );
}
