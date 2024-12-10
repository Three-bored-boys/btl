import React from "react";
import Image from "next/image";
import { Container } from "../libs/client/src/components/layouts/container";
import { LinkButton } from "../libs/client/src/components/ui/link-button";
import notFoundImage from "@/public/assets/images/not-found.webp";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full">
      <Container>
        <div className="flex flex-col items-center justify-start gap-y-3">
          <p className="text-9xl font-extralight">404</p>
          <h2 className="text-5xl">Oops! Page not found!</h2>
          <p>The page you are looking for is not available</p>
          <LinkButton href="/" background={"light"} textSize={"big"}>
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
