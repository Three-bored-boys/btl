import React from "react";
import Image from "next/image";
import { Container } from "../libs/client/src/components/layouts/container";
import { LinkButton } from "../libs/client/src/components/ui/link-button";
import notFoundImage from "@/public/assets/images/not-found.webp";
import { NavBar } from "@/client/components/layouts/navigation-bar/nav-bar";
import { Footer } from "@/client/components/layouts/footer/footer";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full">
      <NavBar />
      <Container>
        <div className="flex flex-col items-center justify-start gap-y-3 py-5">
          <p className="mb-3 text-8xl font-extralight md:mb-9 md:text-9xl">404</p>
          <h2 className="mb-2 text-4xl radix-xs:text-5xl md:mb-5 md:text-7xl">Oops! Page not found!</h2>
          <p className="mb-8 text-base radix-xs:text-xl md:mb-3 md:text-2xl">
            The page or resource you are looking for is not available
          </p>
          <LinkButton href="/" background={"light"} textSize={"big"} className="mb-28 radix-xs:mb-9">
            Return Home
          </LinkButton>
          <div>
            <Image src={notFoundImage} alt="Cartoon image of man sitting on floor and reading a book"></Image>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
